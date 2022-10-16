import React, { useContext, useEffect, useState } from "react";
import useForm from "../../app/hooks/useForm";
import { userContext } from "../../context/UserContext";

const generateRegisterFormValues = () => {
  return {
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

const LoginForm = () => {
  const { authenticate } = useContext(userContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {
    formValues: loginFormValues,
    onInputChange,
    checkButtonDisable,
  } = useForm({ defaultFormValues: generateRegisterFormValues() });

  useEffect(() => {
    setIsButtonDisabled(checkButtonDisable(loginFormValues));
  }, [loginFormValues]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const email = loginFormValues.email.value;
    const password = loginFormValues.password.value;
    authenticate({ email, password }, "/users/login");
  };
  return (
    <div className="App">
      <h1>LOGIN</h1>
      <form>
        {loginFormValues.email.error && <h1>{loginFormValues.email.error}</h1>}
        <input
          onChange={onInputChange}
          name="email"
          value={loginFormValues.email.value}
          placeholder="Email"
        />
        <br />
        {loginFormValues.password.error && (
          <h1>{loginFormValues.password.error}</h1>
        )}
        <input
          onChange={onInputChange}
          name="password"
          value={loginFormValues.password.value}
          placeholder="Password"
        />
        <br />
        <button disabled={isButtonDisabled} onClick={onFormSubmit}>
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
