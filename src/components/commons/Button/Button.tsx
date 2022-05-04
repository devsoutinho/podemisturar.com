import MaterialButton from '@mui/material/Button';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  label: string;
}
export default function Button({ type, label }: ButtonProps) {
  return (
    <MaterialButton type={type} variant="contained">{label}</MaterialButton>
  )
}
