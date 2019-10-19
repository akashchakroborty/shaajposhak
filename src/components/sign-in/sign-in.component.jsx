import React, { Component } from "react";
import {
  SignInContainer,
  ButtonContainer,
  TitleContainer
} from "./sign-in.styles";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import UserActionTypes from "../../redux/user/user.types";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: UserActionTypes.EMAIL_SIGN_IN_START,
      payload: { email, password }
    });
  };

  handleChange = event => {
    event.preventDefault();
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { dispatch } = this.props;
    return (
      <SignInContainer>
        <TitleContainer>I already have an account</TitleContainer>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
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
  }
}

export default connect()(SignIn);
