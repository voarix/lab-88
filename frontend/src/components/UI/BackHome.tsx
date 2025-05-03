import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

interface Props {
  newPost?: boolean;
}

const BackHome: React.FC<Props>= () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#fff",
        color: "purple",
        "&:hover": {
          backgroundColor: "#eee",
        },
        mt: 2,
      }}
      onClick={() => navigate("/")}
    >
      Back home
    </Button>
  );
};

export default BackHome;