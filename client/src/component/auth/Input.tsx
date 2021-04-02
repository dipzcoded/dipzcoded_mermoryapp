import React from "react";

import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
type Props = {
  half?: boolean;
  name: string;
  label: string;
  type: string;
  autoFocus?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowPassword?: (e: any) => void;
  value: any;
};
const Input: React.FC<Props> = ({
  half,
  name,
  label,
  type,
  autoFocus,
  handleChange,
  handleShowPassword,
  value,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        value={value}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
};

export default Input;
