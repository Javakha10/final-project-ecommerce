import React, { useState } from "react";

const useForm = ({ defaultFormValues }) => {
  const [formValues, setFormValues] = useState(defaultFormValues);

  const onInputChange = (e) => {
    const { validateInput } = formValues[e.target.name];

    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [e.target.name]: {
          ...prevFormValues[e.target.name],
          value: e.target.value,
          error: validateInput ? validateInput(e.target.value) : "",
        },
      };
    });
  };

  const checkButtonDisable = (values) => {
    for (const [key, objValue] of Object.entries(values)) {
      if (objValue.required && (objValue.error || !objValue.value)) {
        return true;
      }
    }
  };
  const clearForm = (obj) => {
    setFormValues(obj);
  };

  return {
    formValues,
    setFormValues,
    clearForm,
    onInputChange,
    checkButtonDisable,
  };
};

export default useForm;
