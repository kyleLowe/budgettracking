import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type TableProps = {
    columns: { name: string }[];
    data: any[];
}

function TableComponent({ columns, data }: TableProps) {

    const rows: any[] = [];

    function subcategoryRow(subcategory: any[]) {
        subcategory.forEach((subcat) => {
            console.log("Subcategory:", subcat);

            rows.push(
                <TableRow key={subcat._id ?? subcat.name}>
                    {columns.map((column) => {
                        const value = column.name === 'subcategory'
                            ? (subcat.subcategory?.length ?? 0)
                            : subcat[column.name];

                        return (
                            <TableCell key={`${subcat._id ?? subcat.name}-${column.name}`}>{value}</TableCell>
                        );
                    })}
                </TableRow>
            );

            if ((subcat.subcategory ?? []).length > 0) {
                subcategoryRow(subcat.subcategory);
            }
        })
    }

    data.forEach((dataRow) => {
        rows.push(
            <TableRow key={dataRow._id ?? dataRow.name}>
                {columns.map((column) => {
                    const value = column.name === 'subcategory'
                        ? (dataRow.subcategory?.length ?? 0)
                        : dataRow[column.name];

                    return (
                        <TableCell key={`${dataRow._id ?? dataRow.name}-${column.name}`}>{value}</TableCell>
                    );
                })}
            </TableRow>
        );

        if ((dataRow.subcategory ?? []).length > 0) {
            subcategoryRow(dataRow.subcategory);
        }
    });

    console.log("Table data:", data);
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.name}>{column.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableComponent;