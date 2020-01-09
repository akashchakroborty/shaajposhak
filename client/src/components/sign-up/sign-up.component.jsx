import React, { useState } from "react";
import { SignUpContainer, TitleContainer } from "./sign-up.styles";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import UserActionTypes from "../../redux/user/user.types";

const SignUP = ({ dispatch }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password don't match.");
      return;
    }
    dispatch({
      type: UserActionTypes.SIGN_UP_START,
      payload: {
        email,
        displayName,
        password
      }
    });
  };

  const handleChange = event => {
    event.preventDefault();
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignUpContainer>
      <TitleContainer>I do not have an account</TitleContainer>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          type="text"
          value={displayName}
          handleChange={handleChange}
          required
          label="Display Name"
        />
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          required
          label="Email"
        />
        <FormInput
          name="password"
          type="password"
          handleChange={handleChange}
          value={password}
          required
          label="Password"
        />
        <FormInput
          name="confirmPassword"
          type="password"
          handleChange={handleChange}
          value={confirmPassword}
          required
          label="Confirm Password"
        />
        <div className="buttons">
          <CustomButton type="submit">Sign Up</CustomButton>
        </div>
      </form>
    </SignUpContainer>
  );
};

export default connect()(SignUP);
