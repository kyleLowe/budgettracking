import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import TransactionInput from "../TransactionInput";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  category: string;
  subcategory: string;
  paymentMethod: string;
  store: string;
  name: string;
  note?: string;
  paymentType: paymentType;
  date: Date;
}

const paymentType = {
  Purchase: "Purchase",
  Income: "Income",
} as const;

type paymentType = (typeof paymentType)[keyof typeof paymentType];

type MUITableProps = {
  data: Transaction[];
};

const transactionColumns: MRT_ColumnDef<Transaction>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "amount", header: "Amount", size: 25 },
  { accessorKey: "currency", header: "Currency", size: 25 },
  { accessorKey: "date", header: "Date", size: 25 },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "subcategory", header: "Subcategory" },
  { accessorKey: "store", header: "Store" },
];

function MUITransactionTable({ data }: MUITableProps) {
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  const table = useMaterialReactTable({
    columns: transactionColumns,
    data: data,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableColumnPinning: true,
    enableEditing: true,
    enableExpanding: true,
    initialState: {
      density: "compact",
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => {
          setTransactionModalOpen(true);
        }}
      >
        Create New Transaction
      </Button>
    ),
  });

  return (
    <div>
      <MaterialReactTable table={table} />
      <Modal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        aria-labelledby="transaction-modal"
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
            onSubmit={() => {
              setTransactionModalOpen(false);
            }}
          >
            {" "}
            <TransactionInput />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 2,
              }}
            >
              <Button onClick={() => setTransactionModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => setTransactionModalOpen(false)}
              >
                Save
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default MUITransactionTable;
