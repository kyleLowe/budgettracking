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

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppContext } from "../providers/AppContextProvider";
import Category, { type CategoryNode } from "./Category";

type Category = {
  _id?: string;
  name: string;
  note?: string;
  subcategory?: Category[];
  subRows?: Category[];
};

function MUITable({
  columns,
  data,
  onCategoryChange,
}: {
  columns: { name: string }[];
  data: Category[];
  onCategoryChange?: () => Promise<void> | void;
}) {
  const [creatingRowIndex, setCreatingRowIndex] = useState<
    number | undefined
  >();
  const [categoryTree, setCategoryTree] = useState<CategoryNode>({
    name: "",
    note: "",
    subcategory: [],
  });
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [treeData, setTreeData] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<CategoryNode>({
    name: "",
    note: "",
    subcategory: [],
  });
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
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={async () => {
              if (!row.original._id) {
                return;
              }

              if (row.depth > 0) {
                void removeSubcategory(row.original._id);
                return;
              }

              void deleteCategory(row.original._id);
              await onCategoryChange?.();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Add Subordinate">
          <IconButton onClick={() => {}}>
            <PersonAddAltIcon />
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
        startIcon={<PersonAddAltIcon />}
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

  const handleCreateCategory = async () => {
    const { name, note, subcategory } = newCategory;

    await createCategory(name, note, subcategory);

    await onCategoryChange?.();
    setNewCategory({ name: "", note: "", subcategory: [] });
    setCategoryModalOpen(false);
  };

  return (
    <div>
      <MaterialReactTable table={table} />

      <Modal
        open={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        aria-labelledby="create-category-modal"
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
          <h2 id="create-category-modal">Create New Category</h2>
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
            onSubmit={handleCreateCategory}
          >
            <Category value={newCategory} onChange={setNewCategory} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 2,
              }}
            >
              <Button onClick={() => setCategoryModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleCreateCategory}>
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
