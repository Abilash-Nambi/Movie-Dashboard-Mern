import React, { Children } from "react";
import { TextField } from "@mui/material";

export const CustomInput = (props) => {
  const { variant, label, name, value, onChange, size, ...children } = props;
  return (
    <>
      <TextField
        variant={variant}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        size={size}
        {...children}
      />
    </>
  );
};
