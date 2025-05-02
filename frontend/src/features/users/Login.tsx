import React, { useState } from "react";
import { LoginMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectLoginError, selectLoginLoading } from "./usersSlice.ts";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert, Button, TextField } from "@mui/material";
import { login } from "./usersThunks.ts";
import { toast } from "react-toastify";

const initialForm: LoginMutation = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginMutation>(initialForm);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(login(form)).unwrap();
      toast.success("Login is successful");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, backgroundColor: "#FF8E53" }}>
        <LockOutlinedIcon sx={{ color: "#fff" }} />
      </Avatar>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textDecorationColor: "#FF8E53", textUnderlineOffset: "4px" }}
      >
        Sign in
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error.error}
        </Alert>
      )}

      <Box
        component="form"
        noValidate
        onSubmit={onSubmitFormHandler}
        sx={{
          mt: 3,
          p: 3,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          borderRadius: 1,
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          color: "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              disabled={loginLoading}
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="family-name"
              value={form.username}
              onChange={onInputChange}
              error={!!error}
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
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#FE6B8B",
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              disabled={loginLoading}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={form.password}
              onChange={onInputChange}
              error={!!error}
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
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#FE6B8B",
                },
              }}
            />
          </Grid>
        </Grid>
        <Button
          disabled={loginLoading}
          type="submit"
          fullWidth
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
          Sign In
        </Button>
        <Grid container justifyContent="space-between">
          <Grid sx={{ mx: "auto" }}>
            <Link
              to="/register"
              variant="body2"
              component={RouterLink}
              sx={{ color: "#fff" }}
            >
              Don't have an account, yet? Sign up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
