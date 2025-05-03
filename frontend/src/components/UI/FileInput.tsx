import { useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  helperText?: string;
  errors?: boolean;
}

const FileInput: React.FC<Props> = ({
  onChange,
  name,
  label,
  helperText,
  errors = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />

      <Grid container spacing={2} alignItems="center">
        <Grid size={{ sm: 9 }}>
          <TextField
            fullWidth
            disabled
            label={label}
            value={filename}
            onClick={activateInput}
            error={errors}
            helperText={helperText}
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": { color: "#fff" },
              "& .MuiInputBase-input": { color: "#fff", caretColor: "#fff" },
              "& .MuiInputBase-input.Mui-disabled": {
                color: "rgba(255, 255, 255, 0.7)",
              },
              "& .MuiInputLabel-root.Mui-disabled": {
                color: "rgba(255, 255, 255, 0.7)",
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "rgba(255, 255, 255, 0.5)",
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#FF8E53",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#FE6B8B" },
              "& .MuiFormHelperText-root": { color: "#fff" },
              "& .MuiInput-underline.Mui-error:after": {
                borderBottomColor: "red",
              },
              "& .MuiInput-underline.Mui-error:before": {
                borderBottomColor: "red",
              },
              "& .MuiFormHelperText-root.Mui-error": { color: "red" },
            }}
          />
        </Grid>
        <Grid size={{ sm: 3 }}>
          <Button
            sx={{
              height: "56px",
              backgroundColor: "#fff",
              color: "#FE6B8B",
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
            variant="contained"
            onClick={activateInput}
            fullWidth
          >
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
