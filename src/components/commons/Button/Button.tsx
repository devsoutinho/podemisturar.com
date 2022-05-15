import MaterialButton from '@mui/material/Button';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  label: string;
  styleSheet?: Record<string,any>;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}
export function Button({ type, label, styleSheet, ...props }: ButtonProps) {
  return (
    <MaterialButton
      type={type}
      variant="contained"
      sx={styleSheet}
      {...props}
    >
      {label}
    </MaterialButton>
  )
}
