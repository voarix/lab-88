import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { User } from "../../src/types";
import { useAppDispatch } from "../../src/app/hooks";
import { unsetUser } from "../../src/features/users/usersSlice";
import { logout } from "../../src/features/users/usersThunks.ts";
import { toast } from "react-toastify";

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

  return (
    <>
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
