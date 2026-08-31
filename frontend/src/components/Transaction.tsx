import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import type { paymentType } from "../interfaces/paymentType";
import { NumericFormat } from "react-number-format";
import Button from "@mui/material/Button";
import { AppContext } from "../providers/AppContextProvider";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";

export default function Transaction() {
  const { getAllCurrencies } = useContext(AppContext);

  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [store, setStore] = useState("");
  const [paymentType, setPaymentType] = useState<paymentType>("Purchase");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([]);

  useEffect(() => {
    async function loadCurrencies() {
      const response = await getAllCurrencies();
      setCurrencyOptions(response?.data?.currencies ?? []);
    }
    void loadCurrencies();
  }, [getAllCurrencies]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const transactionData = {
      name,
      amount,
      currency,
      store,
      paymentType,
      paymentMethod,
      note,
      date,
    };

    console.log("Transaction Data:", transactionData);
  }

  return (
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
      onSubmit={handleSubmit}
    >
      <h1>Transaction</h1>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          id="store"
          label="Store"
          variant="outlined"
          value={store}
          onChange={(e) => setStore(e.target.value)}
          fullWidth
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 2,
          width: "100%",
        }}
      >
        <Autocomplete
          id="currency"
          options={currencyOptions}
          getOptionLabel={(option) =>
            `${option.code} - ${option.currency} (${option.symbol})`
          }
          value={currencyOptions.find((opt) => opt.code === currency) || null}
          onChange={(_, newValue) => setCurrency(newValue?.code || "")}
          renderInput={(params) => (
            <TextField {...params} label="Currency" variant="outlined" />
          )}
          fullWidth
        />

        <NumericFormat
          value={amount}
          onValueChange={(values) => setAmount(values.floatValue ?? 0)}
          customInput={TextField}
          label="Amount"
          decimalScale={2}
          fixedDecimalScale
          allowNegative={false}
          fullWidth
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          select
          id="payment"
          label="Payment Type"
          variant="outlined"
          value={paymentType}
          sx={{ flex: 1 }}
          onChange={(e) => setPaymentType(e.target.value as paymentType)}
          fullWidth
        >
          <MenuItem value="Purchase">Purchase</MenuItem>
          <MenuItem value="Income">Income</MenuItem>
        </TextField>

        <TextField
          id="paymentMethod"
          label="Payment Method"
          variant="outlined"
          value={paymentMethod}
          sx={{ flex: 3 }}
          onChange={(e) => setPaymentMethod(e.target.value)}
          fullWidth
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          id="date"
          label="Date"
          type="date"
          variant="outlined"
          value={date}
          sx={{ flex: 1 }}
          onChange={(e) => setDate(e.target.value)}
        />

        <TextField
          id="note"
          label="Note"
          variant="outlined"
          value={note}
          sx={{ flex: 3 }}
          onChange={(e) => setNote(e.target.value)}
          fullWidth
        />
      </Stack>

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Stack>
  );
}
