import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { useId } from "react";
import { useState } from "react";

export interface SubcategoryNode {
  _id?: string;
  name: string;
  note: string;
}

export interface CategoryNode {
  _id?: string;
  name: string;
  note: string;
  subcategory: SubcategoryNode[];
}

type CategoryProps = {
  value: CategoryNode;
  onChange: (value: CategoryNode) => void;
};

export default function Category({ value, onChange }: CategoryProps) {
  const categoryId = useId();
  const noteId = useId();
  const [subcategories, setSubcategories] = useState<SubcategoryNode[]>(
    value.subcategory || [],
  );
  const [visibleNotes, setVisibleNotes] = useState<Record<number, boolean>>({});

  const addSubcategory = () => {
    setSubcategories([...subcategories, { name: "", note: "" }]);
  };

  const updateSubcategory = (index: number, nextChild: SubcategoryNode) => {
    const updatedChildren = [...subcategories];
    updatedChildren[index] = nextChild;

    setSubcategories(updatedChildren);
    onChange({
      ...value,
      subcategory: updatedChildren,
    });
  };

  const removeSubcategory = (index: number) => {
    setSubcategories(value.subcategory.filter((_, i) => i !== index));
    onChange({
      ...value,
      subcategory: value.subcategory.filter((_, i) => i !== index),
    });
  };

  return (
    <Accordion
      defaultExpanded
      sx={{ marginBottom: 2, border: "1px solid #3f51b5", borderRadius: 2 }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{value.name || "New Category"}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <div style={{ padding: 12 }}>
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

          <Button
            variant="contained"
            onClick={addSubcategory}
            style={{ marginTop: 12, marginBottom: 12 }}
          >
            Add Subcategory
          </Button>

          {subcategories.map((child, index) => (
            <div
              key={`subcategory-${index}`}
              style={{
                marginBottom: 12,
                padding: 12,
                border: "1px solid #e0e0e0",
                borderRadius: 8,
              }}
            >
              <TextField
                label={`Subcategory ${index + 1}`}
                value={child.name}
                onChange={(e) =>
                  updateSubcategory(index, { ...child, name: e.target.value })
                }
                variant="outlined"
                fullWidth
                style={{ marginBottom: 12 }}
              />

              <Button
                variant="outlined"
                onClick={() =>
                  setVisibleNotes((current) => ({
                    ...current,
                    [index]: !current[index],
                  }))
                }
              >
                {visibleNotes[index] ? "Hide Note" : "Show Note"}
              </Button>

              {visibleNotes[index] && (
                <TextField
                  label="Subcategory Note"
                  value={child.note}
                  onChange={(e) =>
                    updateSubcategory(index, { ...child, note: e.target.value })
                  }
                  rows={3}
                  multiline
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: 12 }}
                />
              )}

              <Button
                variant="outlined"
                color="error"
                onClick={() => removeSubcategory(index)}
              >
                Remove Subcategory
              </Button>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
