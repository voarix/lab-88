import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import FileInput from "../../../components/UI/FileInput.tsx";
import { postSchema } from "../../../zodSchemas/postSchemas.ts";
import { PostMutation, GlobalError, ValidationError } from "../../../types";
import Box from "@mui/material/Box";

interface Props {
  onSubmitPost: (news: PostMutation) => void;
  loading: boolean;
  error: GlobalError | ValidationError | null;
}

const PostForm: React.FC<Props> = ({ onSubmitPost, loading, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  const getFieldError = (fieldName: keyof PostMutation) => {
    if (!error) return undefined;

    if ("errors" in error && error.errors[fieldName]) {
      return error.errors[fieldName].message;
    }

    if (
      "error" in error &&
      (fieldName === "description" || fieldName === "image")
    ) {
      return error.error;
    }

    return undefined;
  };

  const onSubmit = (data: PostMutation) => {
    onSubmitPost({ ...data });
  };

  const fileInputChangeHandler = (
    eFile: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = eFile.target;

    if (files) {
      setValue("image", files[0]);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 3,
        p: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        borderRadius: 1,
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "#fff",
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid size={{ sm: 12 }} sx={{ margin: "0 auto" }}>
          <TextField
            disabled={loading}
            fullWidth
            id="title"
            label="Title"
            {...register("title")}
            error={!!errors.title || !!getFieldError("title")}
            helperText={errors.title?.message || getFieldError("title")}
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": { color: "#fff" },
              "& .MuiInputBase-input": { color: "#fff", caretColor: "#fff" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "rgba(255, 255, 255, 0.5)",
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#FF8E53",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#FE6B8B" },
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

        <Grid size={{ sm: 12 }} sx={{ margin: "0 auto" }}>
          <TextField
            disabled={loading}
            fullWidth
            multiline
            rows={3}
            id="description"
            label="Description"
            {...register("description")}
            error={!!errors.description || !!getFieldError("description")}
            helperText={
              errors.description?.message || getFieldError("description")
            }
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": { color: "#fff" },
              "& .MuiInputBase-input": { color: "#fff", caretColor: "#fff" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "rgba(255, 255, 255, 0.5)",
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#FF8E53",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#FE6B8B" },
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

        <Grid size={{ sm: 12 }} sx={{ margin: "0 auto" }}>
          <FileInput
            name="image"
            label="Image"
            onChange={fileInputChangeHandler}
            errors={!!errors.image || !!getFieldError("image")}
            helperText={errors.image?.message || getFieldError("image")}
          />
        </Grid>

        <Grid size={{ sm: 12 }} sx={{ margin: "0 auto" }}>
          <Button
            disabled={loading}
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#fff",
              color: "#FE6B8B",
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostForm;
