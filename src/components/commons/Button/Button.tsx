import MaterialButton from '@mui/material/Button';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  label: string;
  styleSheet?: Record<string,any>;
}
export function Button({ type, label, styleSheet }: ButtonProps) {
  return (
    <MaterialButton
      type={type}
      variant="contained"
      sx={styleSheet}
    >
      {label}
    </MaterialButton>
  )
}
