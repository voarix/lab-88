import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import AppToolbar from "../components/UI/AppToolbar.tsx";
import { Route, Routes } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { ToastContainer } from "react-toastify";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import Posts from "./features/posts/Posts.tsx";
import ProtectedRoute from "../components/UI/ProtectedRoute.tsx";
import NewPost from "./features/posts/NewPost.tsx";
import { useAppSelector } from "./app/hooks.ts";
import { selectUser } from "./features/users/usersSlice.ts";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <ToastContainer autoClose={1000} />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Posts />} />
            <Route
              path="/new-post"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <NewPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<Typography variant="h4">Not found page</Typography>}
            />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
