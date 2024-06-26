import React, { useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import sprite from "../../images/sprite.svg";
import { registerThunk } from "../../redux/thunk";
import {
  StyledAuthButton,
  StyledForm,
  StyledFormWrapper,
  StyledLabel,
  StyledSigninLink,
  StyledSignUpTitle,
  StyledSvgIconShowPassword,
  StyledWrapInput,
  ErrorMessage,
  StyledInputEmail,
  StyledInputConfirm,
  StyledInputPassword,
} from "./SignupPageStyled";
import { useNavigate } from "react-router-dom";
import { selectIsLogin } from "../../redux/selectors";
import { useEffect } from "react";
import {
  StyledBannerSvgLogin,
  StyledBannerSvgWrapper,
  StyledFormWrapperLogin,
  StyledWrapperSignIn,
} from "../SigninPage/SigninPageStyled";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValidBorderEmail, setIsValidBorderEmail] = useState(" ");
  const [isValidBorderPassword, setIsValidBorderPassword] = useState(" ");
  const [isValidBorderConfirm, setIsValidBorderConfirm] = useState(" ");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLogin = useSelector(selectIsLogin);

  // useEffect(() => {
  //   if (!isLogin) return;
  //   navigate("/", { replace: true });
  // }, [isLogin]);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordError("Passwords do not match.");
      setIsValidBorderConfirm("");
      return;
    } else {
      setIsValidBorderConfirm(" ");
    }
    console.log(data);
    dispatch(registerThunk(data));
    reset();
  };
  const validateEmail = (value) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = emailRegex.test(value);
    if (!isValid) {
      setEmailError("Example of valid email: john@mail.com");
      setIsValidBorderEmail("");
    } else {
      setIsValidBorderEmail(" ");
      setEmailError("");
    }
    return isValid;
  };
  const validatePassword = (value) => {
    const hasNumber = (value.match(/\d/g) || []).length >= 6;
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

    const isValid =
      hasNumber &&
      hasLowerCase &&
      hasUpperCase &&
      hasSpecialChar &&
      value.length >= 6 &&
      value.length <= 16;

    if (!isValid) {
      setPasswordError(
        "Password must contain at least 6 numbers, one lowercase letter, one uppercase letter, and one special character. In summary  9 - 16 symbols"
      );
      setIsValidBorderPassword("");
    } else {
      setIsValidBorderPassword(" ");
      setPasswordError("");
    }
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <>
      {/* <StyledFormWrapper> */}
      <StyledWrapperSignIn>
        <StyledFormWrapperLogin>
          <StyledSignUpTitle>Sign Up</StyledSignUpTitle>
          <ErrorMessage>{emailError}</ErrorMessage>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledLabel>Enter your email</StyledLabel>
            <StyledInputEmail
              $isValidBorderEmail={isValidBorderEmail}
              name="email"
              required
              type="email"
              placeholder="E-mail"
              {...register("email", {
                required: true,
                validate: validateEmail,
              })}
            />
            <StyledLabel>Enter your password</StyledLabel>
            <StyledWrapInput>
              <StyledInputPassword
                $isValidBorderPassword={isValidBorderPassword}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  validate: validatePassword,
                })}
              />
              <StyledSvgIconShowPassword onClick={togglePasswordVisibility}>
                <use
                  href={`${sprite}#icon-${showPassword ? "show" : "hide"}`}
                ></use>
              </StyledSvgIconShowPassword>
            </StyledWrapInput>
            <ErrorMessage>{passwordError}</ErrorMessage>
            <StyledLabel>Repeat password</StyledLabel>
            <StyledWrapInput>
              <StyledInputConfirm
                $isValidBorderConfirm={isValidBorderConfirm}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat password"
                {...register("confirmPassword")}
              />
              <StyledSvgIconShowPassword onClick={toggleConfirmPassVisibility}>
                <use
                  href={`${sprite}#icon-${
                    showConfirmPassword ? "show" : "hide"
                  }`}
                ></use>
              </StyledSvgIconShowPassword>
            </StyledWrapInput>
            <StyledAuthButton type="submit">Sign Up</StyledAuthButton>
          </StyledForm>
          <StyledSigninLink to="/signin">Sign In</StyledSigninLink>
          {/* <AuthForm /> */}
          {/* </StyledFormWrapper> */}
        </StyledFormWrapperLogin>
        <StyledBannerSvgWrapper>
          <StyledBannerSvgLogin>
            <use href={`${sprite}#icon-background-bottle`}></use>
          </StyledBannerSvgLogin>
        </StyledBannerSvgWrapper>
      </StyledWrapperSignIn>
    </>
  );
};

export default SignupPage;
