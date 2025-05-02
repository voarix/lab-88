import { AppBar, Container, styled, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AnonymousMenu from "./AnonymousMenu";
import { useAppSelector } from "../../src/app/hooks";
import { selectUser } from "../../src/features/users/usersSlice";
import UserMenu from "./UserMenu.tsx";

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "rgba(255, 255, 255, 0.8)",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar
      position="sticky"
      sx={{
        mb: 2,
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "#fff",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      }}
    >
      <Toolbar>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Reddit</Link>
            </Typography>
            <Grid
              container
              justifyContent="space-between"
              spacing={4}
              alignItems="center"
            >
              {user ? <UserMenu user={user} /> : <AnonymousMenu />}
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
