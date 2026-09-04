import NavBar from "../components/NavBar";
import Category, { type CategoryNode } from "../components/Category";
import { useContext, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AppContext } from "../providers/AppContextProvider";
import Table from "../components/Table";
import MUITable from "../components/MUICategoryTable";

function CategoryPage() {
  const { getAllCategories } = useContext(AppContext);
  const [categories, setCategories] = useState<CategoryNode[]>();
  const [columns, setColumns] = useState<{ name: string }[]>([]);

  const fetchCategories = async () => {
    const response = await getAllCategories();
    setCategories(response?.data ?? []);
    let keys = Object.keys(response?.data[0] ?? {});
    const removekeys = ["_id", "__v"];
    keys = keys.filter((key) => !removekeys.includes(key));
    setColumns(keys.map((column) => ({ name: column })));
  };

  useEffect(() => {
    void fetchCategories();
  }, []);
  return (
    <div>
      <NavBar />
      <h1>Add Category</h1>
      {/* <Table columns={columns} data={categories ?? []} /> */}
      <MUITable
        columns={columns}
        data={categories ?? []}
        onCategoryChange={fetchCategories}
      />
      {/* <Category value={categoryTree} onChange={setCategoryTree} onCategoryChange={fetchCategories} /> */}
    </div>
  );
}

export default CategoryPage;
