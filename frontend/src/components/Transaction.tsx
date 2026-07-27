import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import type { paymentType } from "../interfaces/paymentType";
import { NumericFormat } from 'react-number-format';
import Button from "@mui/material/Button";
import { AppContext } from "../providers/AppContextProvider";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";

export default function Transaction() {
    const { getAllCurrencies } = useContext(AppContext);
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [currency, setCurrency] = useState<string>('');
    const [store, setStore] = useState('');
    const [paymentType, setPaymentType] = useState<paymentType>('Purchase');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [note, setNote] = useState<string | ''>('');
    const [category, setCategory] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [currencyOptions, setCurrencyOptions] = useState<any[]>([]);

    useEffect(() => {
        async function loadCurrencies() {
            const response = await getAllCurrencies();
            console.log('Currencies:', response);
            setCurrencyOptions(response?.data?.currencies ?? []);
        }
        void loadCurrencies();
    }, [getAllCurrencies]);

    return (
        <Stack component="form" direction="column" spacing={2} alignItems="flex-start" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <h1>Transaction</h1>
            <TextField
                id='name'
                label='Name'
                variant='outlined'
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
            <Autocomplete
                id='currency'
                options={currencyOptions}
                getOptionLabel={(option) => `${option.code} - ${option.currency} (${option.symbol})`}
                value={currencyOptions.find((opt) => opt.code === currency) || null}
                onChange={(event, newValue) => setCurrency(newValue?.code || '')}
                renderInput={(params) => <TextField {...params} label='Currency' variant='outlined' />}
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
            <TextField
                id='store'
                label='Store'
                variant='outlined'
                value={store}
                onChange={(e) => setStore(e.target.value)}
                fullWidth
            />
            <TextField
            select
                id='payment'
                label='Payment Type'
                variant='outlined'
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as paymentType)}
                fullWidth
            >
                <MenuItem value="Purchase">Purchase</MenuItem>
                <MenuItem value="Income">Income</MenuItem>
            </TextField>
            <TextField
                id='paymentMethod'
                label='Payment Method'
                variant='outlined'
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                fullWidth
            />
            <TextField
                id='note'
                label='Note'
                variant='outlined'
                value={note}
                minRows={3}
                onChange={(e) => setNote(e.target.value)}
                fullWidth
            />
            <TextField
                id='date'
                label='Date'
                type='date'
                variant='outlined'
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <TextField
                id='category'
                label='Category'
                variant='outlined'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
            />
            <Button variant='contained' type='submit'>
                Submit
            </Button>
        </Stack>
    )
}