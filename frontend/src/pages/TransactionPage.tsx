import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TransactionInput from "../components/TransactionInput";
import { AppContext } from "../providers/AppContextProvider";
import DateRangePicker from "../components/DateRangePicker";
import MUITransactionTable, {
  type Transaction,
} from "../components/table/MUITransactionTable";

function TransactionPage() {
  const { getTransactionsByDate } = useContext(AppContext);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      if (startDate && endDate) {
        const response = await getTransactionsByDate(
          startDate.toISOString(),
          endDate.toISOString(),
        );
        setTransactions(response?.data ?? []);
      }
    }
    fetchTransactions();
  }, [startDate, endDate, getTransactionsByDate]);

  return (
    <div>
      <NavBar />
      <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
      <MUITransactionTable data={transactions} />
    </div>
  );
}

export default TransactionPage;
