import { useContext, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  darken,
  lighten,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { AppContext } from "../providers/AppContextProvider";
import Category, { type CategoryNode } from "./Category";

type Category = {
  _id?: string;
  name: string;
  note?: string;
  subcategory?: Category[];
  subRows?: Category[];
};

type MUITableProps = {
  columns: { name: string }[];
  data: Category[];
  category?: CategoryNode;
  onCategoryChange?: () => Promise<void> | void;
};

function MUITable({
  columns,
  data,
  category,
  onCategoryChange,
}: MUITableProps) {
  const [creatingRowIndex, setCreatingRowIndex] = useState<
    number | undefined
  >();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [treeData, setTreeData] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<CategoryNode>({
    name: "",
    note: "",
    subcategory: [],
  });
  const [currentCategory, setCurrentCategory] = useState<CategoryNode | null>(
    null,
  );
  const { deleteCategory, updateCategory, createCategory } =
    useContext(AppContext);

  const normalizeCategories = (categories: Category[] = []): Category[] =>
    categories.map((category) => {
      const subcategory = category.subcategory ?? [];

      return {
        ...category,
        subcategory,
        subRows: normalizeCategories(subcategory),
      };
    });

  useEffect(() => {
    setTreeData(normalizeCategories(data ?? []));
  }, [data]);

  useEffect(() => {
    if (!category) {
      return;
    }

    setCurrentCategory({
      ...category,
      note: category.note ?? "",
      subcategory: category.subcategory ?? [],
    });
    setCategoryModalOpen(true);
  }, [category]);

  const heading = useMemo<MRT_ColumnDef<Category>[]>(
    () =>
      columns
        .filter(
          (column) =>
            column.name !== "_id" &&
            column.name !== "__v" &&
            column.name !== "subcategory",
        )
        .map((column) => ({
          accessorKey: column.name,
          header: column.name.charAt(0).toUpperCase() + column.name.slice(1),
        })),
    [columns],
  );

  const table = useMaterialReactTable({
    columns:
      heading.length > 0
        ? heading
        : [
            { accessorKey: "name", header: "Name" },
            { accessorKey: "note", header: "Note" },
          ],
    data: treeData,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableColumnPinning: true,
    enableEditing: true,
    enableExpanding: true,
    positionCreatingRow: creatingRowIndex,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton
            disabled={row.depth !== 0}
            onClick={() => {
              const category = row.original;

              if (!category._id) {
                return;
              }

              setCurrentCategory({
                _id: category._id,
                name: category.name,
                note: category.note ?? "",
                subcategory: (category.subcategory ?? []).map(
                  (subcategory) => ({
                    _id: subcategory._id,
                    name: subcategory.name,
                    note: subcategory.note ?? "",
                  }),
                ),
              });

              setCategoryModalOpen(true);
            }}
          >
            <EditIcon
              sx={{
                visibility: row.depth === 0 ? "visible" : "hidden",
              }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={async () => {
              const categoryId = row.original._id;

              if (!categoryId) {
                return;
              }

              if (row.depth !== 0) {
                await removeSubcategory(categoryId);
                return;
              }

              await deleteCategory(categoryId);
              await onCategoryChange?.();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    initialState: {
      columnPinning: { left: [], right: ["mrt-row-actions"] },
      expanded: {},
      density: "compact",
      pagination: { pageSize: 20, pageIndex: 0 },
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => {
          setCategoryModalOpen(true);
        }}
      >
        Create New Category
      </Button>
    ),
    muiTableBodyRowProps: ({ row }) => ({
      sx: (theme) => ({
        td: {
          backgroundColor: darken(
            lighten(theme.palette.background.paper, 0.1),
            row.depth * (theme.palette.mode === "dark" ? 0.2 : 0.1),
          ),
        },
      }),
    }),
  });

  const closeCategoryModal = () => {
    setCategoryModalOpen(false);
    setCurrentCategory(null);
  };

  const findParentCategory = (
    categories: Category[],
    categoryId: string,
  ): Category | null => {
    for (const category of categories) {
      const children = category.subcategory ?? [];

      if (children.some((child) => child._id === categoryId)) {
        return category;
      }

      const found = findParentCategory(children, categoryId);
      if (found) {
        return found;
      }
    }

    return null;
  };

  const removeCategoryFromTree = (
    categories: Category[],
    categoryId: string,
  ): Category[] =>
    categories
      .map((category) => {
        const nextChildren = removeCategoryFromTree(
          category.subcategory ?? [],
          categoryId,
        );

        if (category._id === categoryId) {
          return null;
        }

        return {
          ...category,
          subcategory: nextChildren,
          subRows: normalizeCategories(nextChildren),
        };
      })
      .filter(Boolean) as Category[];

  const removeSubcategory = async (categoryId: string) => {
    const parent = findParentCategory(treeData, categoryId);

    if (!parent || !parent._id) {
      return;
    }

    const nextSubcategory = (parent.subcategory ?? []).filter(
      (child) => child._id !== categoryId,
    );

    const nextTree = removeCategoryFromTree(treeData, categoryId);

    setTreeData(nextTree);

    await updateCategory(
      parent._id,
      parent.name,
      parent.note ?? "",
      nextSubcategory,
    );
    await onCategoryChange?.();
  };

  const handleSubmitCategory = async () => {
    if (currentCategory) {
      const { _id, name, note, subcategory } = currentCategory;
      if (!_id) {
        console.error("Current category is missing _id:", currentCategory);
        return;
      }
      await updateCategory(_id, name, note ?? "", subcategory);
    } else {
      const { name, note, subcategory } = newCategory;
      await createCategory(name, note, subcategory);
    }

    await onCategoryChange?.();
    closeCategoryModal();
  };

  return (
    <div>
      <MaterialReactTable table={table} />

      <Modal
        open={categoryModalOpen}
        onClose={closeCategoryModal}
        aria-labelledby="category-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 900,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <h2 id="category-modal">
            {currentCategory ? "Edit Category" : "Create New Category"}
          </h2>
          <Stack
            component="form"
            direction="column"
            spacing={2}
            alignItems="flex-start"
            sx={{
              display: "flex",
              alignItems: "stretch",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
            onSubmit={handleSubmitCategory}
          >
            <Category
              value={currentCategory ?? newCategory}
              onChange={(value) => {
                if (currentCategory) {
                  setCurrentCategory(value);
                } else {
                  setNewCategory(value);
                }
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 2,
              }}
            >
              <Button onClick={closeCategoryModal}>Cancel</Button>
              <Button variant="contained" onClick={handleSubmitCategory}>
                Save
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default MUITable;
