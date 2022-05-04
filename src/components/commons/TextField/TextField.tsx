import MaterialTextField from '@mui/material/TextField';
import React from 'react';

interface TextFieldProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  value: string;
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styleSheet?: Record<string,any>;
}
export function TextField({ value, type, name, label, styleSheet, onChange }: TextFieldProps) {
  return (
    <MaterialTextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      type={type}
      name={name}
      onChange={onChange}
      sx={styleSheet}
    />
  );
}
