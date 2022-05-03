import React from 'react';

export function useForm({
  initialValues,
}) {
  const [values, setValues] = React.useState(initialValues);

  function setValue(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: value,
      };
    })
  }

  return {
    values,
    setValue
  };
}
