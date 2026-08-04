import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useId } from "react";

export interface CategoryNode {
  name: string;
  note: string;
  subcategory: CategoryNode[];
}

type CategoryProps = {
  value: CategoryNode;
  onChange: (value: CategoryNode) => void;
};

export default function Category({ value, onChange }: CategoryProps) {

  const categoryId = useId();
  const noteId = useId();

  const addSubcategory = () => {
    onChange({
      ...value,
      subcategory: [
        ...value.subcategory,
        { name: "", note: "", subcategory: [] },
      ],
    });
  };

  const updateChild = (index: number, nextChild: CategoryNode) => {
    const updatedChildren = [...value.subcategory];
    updatedChildren[index] = nextChild;

    onChange({
      ...value,
      subcategory: updatedChildren,
    });
  };

  const removeChild = (index: number) => {
    onChange({
      ...value,
      subcategory: value.subcategory.filter((_, i) => i !== index),
    });
  };

  return (
    <div
      style={{
        marginBottom: 16,
        padding: 12,
        border: "1px solid #3f51b5",
        borderRadius: 8,
      }}
    >
      <TextField
        id={categoryId}
        label="Category"
        value={value.name}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
        variant="outlined"
        fullWidth
        style={{ marginBottom: 12 }}
      />

      <TextField
        id={noteId}
        label="Note"
        value={value.note}
        onChange={(e) => onChange({ ...value, note: e.target.value })}
        rows={4}
        multiline
        variant="outlined"
        fullWidth
      />

      <Button variant="contained" onClick={addSubcategory} style={{ marginTop: 12 }}>
        Add Subcategory
      </Button>

     {value.subcategory.map((child, index) => (
      <div key={index} style={{ marginBottom: 12 }}>
        <Category
          value={child}
          onChange={(nextChild) => updateChild(index, nextChild)}
        />

        <Button
          variant="outlined"
          color="error"
          onClick={() => removeChild(index)}
        >
          Remove Subcategory
        </Button>
      </div>
    ))}
    </div>
  );
}