import React, { useState } from "react";
import {
  SignInContainer,
  ButtonContainer,
  TitleContainer
} from "./sign-in.styles";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import UserActionTypes from "../../redux/user/user.types";

const SignIn = ({ dispatch }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userCredentials;

  const handleSubmit = event => {
    event.preventDefault();
    dispatch({
      type: UserActionTypes.EMAIL_SIGN_IN_START,
      payload: { email, password }
    });
  };

  const handleChange = event => {
    event.preventDefault();
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInContainer>
      <TitleContainer>I already have an account</TitleContainer>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <ButtonContainer>
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={() =>
              dispatch({
                type: UserActionTypes.GOOGLE_SIGN_IN_START
              })
            }
            isGoogleSignIn
          >
            {" "}
            Sign In with Google{" "}
          </CustomButton>
        </ButtonContainer>
      </form>
    </SignInContainer>
  );
};

export default connect()(SignIn);
