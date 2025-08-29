import {
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";

export default function SortMenu({ sort, onChange }) {
  const options = [
    { value: "none", label: "None" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "status", label: "Status" },
    { value: "deadline", label: "Deadline" },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        mt: 0.2,
        zIndex: 50,
        borderRadius: 2,
        px: 1,
        py: 1.5,
      }}
    >
      <RadioGroup
        value={sort}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.25,
        }}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={
              <Radio
                size="small"
                sx={{
                  p: 0.1,
                  "& .MuiSvgIcon-root": { fontSize: 15 },
                }}
              />
            }
            label={
              <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
                {opt.label}
              </Typography>
            }
            sx={{
              m: 0,
              gap: 0.2,
              alignItems: "center",
              "& .MuiFormControlLabel-label": {
                lineHeight: 1.2,
              },
            }}
          />
        ))}
      </RadioGroup>
    </Paper>
  );
}
