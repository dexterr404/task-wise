import { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";

export default function FilterMenu({ onChange, options = [], selected = [] }) {
  // Use parent state, fallback to all true
  const [filters, setFilters] = useState(
    options.reduce((acc, opt) => {
      acc[opt] = selected.length === 0 ? true : selected.includes(opt);
      return acc;
    }, { all: true })
  );

  useEffect(() => {
    // Sync with parent when `selected` changes
    setFilters(
      options.reduce((acc, opt) => {
        acc[opt] = selected.length === 0 ? true : selected.includes(opt);
        return acc;
      }, { all: true })
    );
  }, [selected, options]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const updated = { ...filters };

    if (name === "all") {
      if (!checked) return;
      Object.keys(updated).forEach((key) => (updated[key] = true));
    } else {
      const activeCount = options.filter((opt) => updated[opt]).length;
      if (!checked && activeCount === 1) return;
      updated[name] = checked;
      updated.all = options.every((opt) => updated[opt]);
    }

    setFilters(updated);

    const activeFilters = options.filter((opt) => updated[opt]);
    onChange(activeFilters.length === options.length ? [] : activeFilters);
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
        {options.map((status) => (
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
