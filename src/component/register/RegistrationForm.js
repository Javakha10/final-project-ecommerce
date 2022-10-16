import React, { useContext, useEffect, useState } from "react";

import useForm from "../../app/hooks/useForm";
import { userContext } from "../../context/UserContext";

const generateRegisterFormValues = () => {
  return {
    firstName: {
      value: "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 3 ? null : "type more than three words",
    },
    lastName: {
      value: "",
      required: true,
      error: "",
      validateInput: (lastName) =>
        lastName.length > 3 ? null : "type more than three words",
    },
    email: {
      value: "",
      required: true,
      error: "",
      validateInput: (email) =>
        email.includes("@gmail.com") ? null : "email is not valid",
    },

    password: {
      value: "",
      required: true,
      error: "",
      validateInput: (password) =>
        password.length > 6
          ? null
          : "password should have at least 6 characters",
    },
  };
};

const RegistrationForm = () => {
  const { authenticate } = useContext(userContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {
    formValues: registerFormValues,
    onInputChange,
    checkButtonDisable,
  } = useForm({
    defaultFormValues: generateRegisterFormValues(),
  });

  useEffect(() => {
    setIsButtonDisabled(checkButtonDisable(registerFormValues));
  }, [registerFormValues]);

  const onSubmit = (e) => {
    e.preventDefault();
    const firstName = registerFormValues.firstName.value;
    const lastName = registerFormValues.lastName.value;
    const email = registerFormValues.email.value;
    const password = registerFormValues.password.value;
    authenticate({ firstName, lastName, email, password }, "/users/register");
  };

  return (
    <div className="App">
      <h1>CREATE ACCOUNT</h1>
      <form>
        {registerFormValues.firstName.error && (
          <h1>{registerFormValues.firstName.error}</h1>
        )}
        <input
          onChange={onInputChange}
          name="firstName"
          value={registerFormValues.firstName.value}
          placeholder="First Name"
        />
        <br />
        {registerFormValues.lastName.error && (
          <h1>{registerFormValues.lastName.error}</h1>
        )}
        <input
          onChange={onInputChange}
          name="lastName"
          value={registerFormValues.lastName.value}
          placeholder="Last Name"
        />
        <br />
        {registerFormValues.email.error && (
          <h1>{registerFormValues.email.error}</h1>
        )}
        <input
          onChange={onInputChange}
          name="email"
          value={registerFormValues.email.value}
          placeholder="Email"
        />
        <br />
        {registerFormValues.password.error && (
          <h1>{registerFormValues.password.error}</h1>
        )}
        <input
          onChange={onInputChange}
          name="password"
          value={registerFormValues.password.value}
          placeholder="Password"
        />
        <br />
        <button disabled={isButtonDisabled} onClick={onSubmit}>
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
