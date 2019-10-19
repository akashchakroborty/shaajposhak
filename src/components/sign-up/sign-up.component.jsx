import React, { Component } from "react";
import { SignUpContainer, TitleContainer } from "./sign-up.styles";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import UserActionTypes from "../../redux/user/user.types";

class SignUP extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, displayName, password, confirmPassword } = this.state;
    const { dispatch } = this.props;
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

  handleChange = event => {
    event.preventDefault();
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, displayName, password, confirmPassword } = this.state;
    return (
      <SignUpContainer>
        <TitleContainer>I do not have an account</TitleContainer>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            value={displayName}
            handleChange={this.handleChange}
            required
            label="Display Name"
          />
          <FormInput
            name="email"
            type="email"
            value={email}
            handleChange={this.handleChange}
            required
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={password}
            required
            label="Password"
          />
          <FormInput
            name="confirmPassword"
            type="password"
            handleChange={this.handleChange}
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
  }
}

export default connect()(SignUP);
