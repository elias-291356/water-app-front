import React from "react";
import { StyledHeaderUser } from "../Header/HeaderStyled";
import {
  StyledHeaderUserItem,
  StyledHeaderUserItemLink,
} from "./UserAuthStyled";
import sprite from "../../images/sprite.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogin, selectToken } from "../../redux/selectors";
import { logoutThunk } from "../../redux/thunk";
import { StyledSigninLink } from "../../pages/SignupPage/SignupPageStyled";

const UserAuth = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLogin);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const onClickToSigninPage = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    // navigate("/logout");
    dispatch(logoutThunk(token));
  };
  return (
    <>
      {isLogin ? (
        <StyledHeaderUserItem>
          <StyledHeaderUser>
            <use href={`${sprite}#icon-user`}></use>
          </StyledHeaderUser>
          <StyledSigninLink onClick={handleLogout}>Sign out</StyledSigninLink>
        </StyledHeaderUserItem>
      ) : (
        <StyledHeaderUserItem>
          <StyledHeaderUserItemLink onClick={onClickToSigninPage}>
            Sign in
          </StyledHeaderUserItemLink>

          <StyledHeaderUser>
            <use href={`${sprite}#icon-user`}></use>
          </StyledHeaderUser>
        </StyledHeaderUserItem>
      )}
    </>
  );
};

export default UserAuth;
