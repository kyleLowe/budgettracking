import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Category() {
    const [category, setCategory] = useState<string>('');
    const [note, setNote] = useState<string>('');
    return(
        <div>
            <TextField
                id='category'
                label='Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant='outlined'
            />
            <TextField
                id='note'
                label='Note'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                variant='outlined'
            />
        </div>
    )
}