import React from 'react';

export function useForm({
  initialValues,
}) {
  const [values, setValues] = React.useState(initialValues);

  function setValue(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: value,
      };
    })
  }

  return {
    values,
    setValue,
    isInvalid: Object.keys(values).some((key) => !values[key])
  };
}
