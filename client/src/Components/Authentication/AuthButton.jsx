import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Hooks/UserContext";
import { Button } from "@chakra-ui/react";

export default function AuthButton({ display }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  let buttonText = user ? "Log Out" : "Sign In";
  const handleClick = () => {
    if (user) { // log out user
      localStorage.removeItem("user");
      setUser(null);
    }
    navigate("/register-or-login");
  };

  return (
    <Button
      onClick={handleClick}
      as={"a"}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"darkseagreen"}
      display={display}
      _hover={{
        bg: "#42610a",
        color: "white",
      }}
    >
      {buttonText}
    </Button>
  );
}
