import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../Components/Authentication/SignIn";
import SignUp from "../Components/Authentication/SignUp";
import api from "../api";

export default function RegisterOrLoginPage() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");

  const switchForm = (formName) => {
    setFormType(formName);
  };

  const registerOrLogin = async (userForm) => {
    console.log("authenticating user");
    try {
      let response = await api.post(`${formType}/`, userForm);
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log("There was an error and here it is: ", error);
    }
  };

  return (
    <>
      {formType == "login" ? (
        <SignIn switchForm={switchForm} login={registerOrLogin}/>
      ) : (
        <SignUp switchForm={switchForm} register={registerOrLogin}/>
      )}
    </>
  );
}
