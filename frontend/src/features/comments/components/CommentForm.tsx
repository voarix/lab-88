import Grid from "@mui/material/Grid";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import Box from "@mui/material/Box";
import { GlobalError, ValidationError } from "../../../types";
import { commentFormSchema } from "../../../zodSchemas/commentSchemas";

interface CommentFormData {
  text: string;
}

interface Props {
  onSubmitComment: (data: CommentFormData) => void;
  loading: boolean;
  error: GlobalError | ValidationError | null;
}

const CommentForm: React.FC<Props> = ({ onSubmitComment, loading, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      text: "",
    },
  });

  const getFieldError = (fieldName: keyof CommentFormData) => {
    if (!error) return undefined;

    if ("errors" in error && error.errors[fieldName]) {
      return error.errors[fieldName].message;
    }

    if ("error" in error) {
      return error.error;
    }

    return undefined;
  };

  const onSubmit = (data: CommentFormData) => {
    onSubmitComment(data);
    reset();
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 3,
        p: 3,
        boxShadow: "0 3px 5px 2px rgba(156, 39, 176, .3)",
        borderRadius: 1,
        background: "linear-gradient(45deg, #9C27B0 30%, #3F51B5 90%)",
        color: "#fff",
      }}
    >
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid size={{ sm: 12 }} sx={{ margin: "0 auto", width: "100%" }}>
          <TextField
            disabled={loading}
            fullWidth
            multiline
            rows={3}
            id="text"
            label="Your comment"
            placeholder="Share your thoughts..."
            {...register("text")}
            error={!!errors.text || !!getFieldError("text")}
            helperText={errors.text?.message || getFieldError("text")}
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": { color: "#fff" },
              "& .MuiInputBase-input": { color: "#fff", caretColor: "#fff" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "rgba(255, 255, 255, 0.5)",
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#3F51B5",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#2196F3" },
              "& .MuiFormHelperText-root": { color: "#fff" },
              "& .MuiInputBase-root.Mui-disabled": {
                color: "rgba(255, 255, 255, 0.7)",
              },
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

        <Grid size={{ sm: 12 }} sx={{ margin: "0 auto", width: "100%" }}>
          <Button
            disabled={loading}
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#fff",
              color: "#9C27B0",
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#9C27B0" }} />
            ) : (
              "Send"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommentForm;
