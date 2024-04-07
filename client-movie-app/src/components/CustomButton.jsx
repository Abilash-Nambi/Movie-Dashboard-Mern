import { Button } from "@mui/material";
import React from "react";

export const CustomButton = (props) => {
  const { text, size, color, variant, onClick, ...other } = props;
  return (
    <Button
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {text}
    </Button>
  );
};
