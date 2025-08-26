import { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";

export default function FilterMenu({ onChange }) {
  const [filters, setFilters] = useState({
    all: true,
    Ongoing: true,
    "Not Started": true,
    Done: true,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    let updated = { ...filters };

    if (name === "all") {
      if (!checked) return;
      updated = {
        all: checked,
        Ongoing: checked,
        "Not Started": checked,
        Done: checked,
      };
    } else {
      const activeCount =
        filters.Ongoing + filters["Not Started"] + filters.Done;
      if (!checked && activeCount === 1) return;

      updated[name] = checked;
      updated.all = updated.Ongoing && updated["Not Started"] && updated.Done;
    }

    setFilters(updated);

    const activeFilters = [];
    if (updated.Ongoing) activeFilters.push("Ongoing");
    if (updated["Not Started"]) activeFilters.push("Not Started");
    if (updated.Done) activeFilters.push("Done");

    onChange(activeFilters.length === 3 ? [] : activeFilters);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        top: "100%",
        mt: 0.2,
        px: 2,
        pr: 0,
        py: 1.5,
        zIndex: 50,
        borderRadius: 2,
      }}
    >
      <FormGroup
        sx={{
          gap: 0.3,
        }}
      >
        {["all", "Ongoing", "Not Started", "Done"].map((status) => (
          <FormControlLabel
            key={status}
            control={
              <Checkbox
                size="small"
                sx={{
                  p: 0.2,
                  "& .MuiSvgIcon-root": { fontSize: 16 },
                }}
                name={status}
                checked={filters[status]}
                onChange={handleChange}
              />
            }
            label={status === "all" ? "All" : status}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.75rem",
              },
            }}
          />
        ))}
      </FormGroup>
    </Paper>
  );
}
