import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";

const AnonymousMenu = () => {
  return (
    <>
      <Button
        component={NavLink}
        to="/register"
        color="inherit"
        sx={{ mr: 0.5, whiteSpace: "nowrap" }}
      >
        Sign Up
      </Button>
      <Box sx={{ mx: 0.5, color: "inherit" }}>or</Box>
      <Button
        component={NavLink}
        to="/login"
        color="inherit"
        sx={{ whiteSpace: "nowrap" }}
      >
        Sign In
      </Button>
    </>
  );
};

export default AnonymousMenu;
