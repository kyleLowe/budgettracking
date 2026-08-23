import { useContext, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  darken,
  lighten,
} from '@mui/material';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppContext } from '../providers/AppContextProvider';

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
}: {
  columns: { name: string }[];
  data: Category[];
}) {
  const [creatingRowIndex, setCreatingRowIndex] = useState<number | undefined>();
  const { deleteCategory } = useContext(AppContext);

  const normalizeCategories = (categories: Category[] = []): Category[] =>
    categories.map((category) => {
      const { subcategory = [], ...rest } = category;

      return {
        ...rest,
        subRows: normalizeCategories(subcategory),
      };
    });

  const heading = useMemo<MRT_ColumnDef<Category>[]>(
    () =>
      columns
        .filter(
          (column) =>
            column.name !== '_id' &&
            column.name !== '__v' &&
            column.name !== 'subcategory',
        )
        .map((column) => ({
          accessorKey: column.name,
          header:
            column.name.charAt(0).toUpperCase() + column.name.slice(1),
        })),
    [columns],
  );

  const tableData = useMemo(
    () => normalizeCategories(data ?? []),
    [data],
  );

  const table = useMaterialReactTable({
    columns:
      heading.length > 0
        ? heading
        : [
            { accessorKey: 'name', header: 'Name' },
            { accessorKey: 'note', header: 'Note' },
          ],
    data: tableData,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableColumnPinning: true,
    enableEditing: true,
    enableExpanding: true,
    positionCreatingRow: creatingRowIndex,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              if (row.original._id) {
                void deleteCategory(row.original._id);
              }
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
      columnPinning: { left: [], right: ['mrt-row-actions'] },
      expanded: {},
      density: 'compact',
      pagination: { pageSize: 20, pageIndex: 0 },
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        startIcon={<PersonAddAltIcon />}
        variant="contained"
        onClick={() => {
          setCreatingRowIndex(table.getRowModel().rows.length);
          table.setCreatingRow(true);
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
            row.depth * (theme.palette.mode === 'dark' ? 0.2 : 0.1),
          ),
        },
      }),
    }),
  });

  return <MaterialReactTable table={table} />;
}

export default MUITable;