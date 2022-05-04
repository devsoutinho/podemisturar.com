import React, { Children } from 'react';
import MaterialTextField from '@mui/material/TextField';
import MaterialAutocomplete from '@mui/material/Autocomplete';

function withAutoComplete(props: any) {
  const { children, autocomplete, options, onChange, name, disabled, value } = props;
  if (!autocomplete) return children(props);

  return (
    <MaterialAutocomplete
      disablePortal
      disableClearable
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      onChange={(_, newValue: any) => {
        onChange({ target: { value: newValue, name }, type: 'change' });
      }}
      value={value}
      renderInput={children}
      disabled={disabled}
    />
  )

}

interface TextFieldProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  value: string;
  label: string;
  name: string;
  options?: any[];
  autocomplete?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styleSheet?: Record<string, any>;
  disabled?: boolean;
}
export function TextField(props: TextFieldProps) {
  const { value, type, name, label, styleSheet, onChange } = props;

  return withAutoComplete({
    ...props,
    children: (params) => (
      <MaterialTextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={value}
        type={type}
        name={name}
        onChange={onChange}
        sx={styleSheet}
        {...params}
      />
    ),
  });
}
