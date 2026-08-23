import NavBar from "../components/NavBar";
import Category, { type CategoryNode } from "../components/Category";
import { useContext, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AppContext } from "../providers/AppContextProvider";
import Table from "../components/Table";
import MUITable from "../components/MUITable";

function CategoryPage() {
  const {createCategory, getAllCategories} = useContext(AppContext);
  const [categoryTree, setCategoryTree] = useState<CategoryNode>({
    name: "",
    note: "",
    subcategory: [],
  });
  const [categories, setCategories] = useState<CategoryNode[]>();
  const [columns, setColumns] = useState<{ name: string }[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Handle form submission logic here
    console.log(categoryTree);
    const { name, note, subcategory } = categoryTree;
    const response = await createCategory(name, note, subcategory);
    console.log(response);
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      setCategories(response?.data ?? []);
      let keys = Object.keys(response?.data[0] ?? {});
      const removekeys = ["_id", "__v"]
      keys = keys.filter((key) => !removekeys.includes(key));
      setColumns(keys.map((column) => ({ name: column })));
    };
    void fetchCategories();
  }, [getAllCategories]);

    return(<div>
        <NavBar />
            <Stack
      component="form"
      direction="column"
      spacing={2}
      alignItems="flex-start"
      sx={{ display: "flex", alignItems: "stretch", flexDirection: "column", gap: 2, width: "100%" }}
      onSubmit={handleSubmit}
    >
      {/* <Table columns={columns} data={categories ?? []} /> */}
      <MUITable columns={columns} data={categories ?? []} />
        <h1>Add Category</h1>
        <Category value={categoryTree} onChange={setCategoryTree} />
         <Button variant="contained" type="submit">
        Submit
      </Button>
    </Stack>
       
    </div>)
}

export default CategoryPage;