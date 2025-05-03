import { useState } from "react";
import { Button, Menu, MenuItem, styled } from "@mui/material";
import { User } from "../../../types";
import { useAppDispatch } from "../../../app/hooks.ts";
import { unsetUser } from "../../../features/users/usersSlice.ts";
import { logout } from "../../../features/users/usersThunks.ts";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const handeClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserOptionsEl(event.currentTarget);
  };

  const handleClose = () => {
    setUserOptionsEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(unsetUser());
    handleClose();
    toast.success("Logout is successful");
  };

  const Link = styled(NavLink)({
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      color: "rgba(255, 255, 255, 0.8)",
    },
  });

  return (
    <>
      <Link to="new-post" sx={{ textTransform: "uppercase" }}>
        Add post
      </Link>
      <Button onClick={handeClick} color="inherit">
        Hello, {user.username}!
      </Button>
      <Menu
        anchorEl={userOptionsEl}
        open={!!userOptionsEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
