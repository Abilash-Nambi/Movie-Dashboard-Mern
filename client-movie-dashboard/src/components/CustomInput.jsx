import React from "react";
import { TextField } from "@mui/material";

export const CustomInput = (props) => {
  const { variant, label, name, value, onChange } = props;
  return (
    <>
      <TextField
        variant={variant}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
