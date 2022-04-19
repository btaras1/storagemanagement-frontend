import React from "react";
import { Link } from "react-router-dom";
import { Button as ButtonStyle } from "./ButtonStyle";

const Button = ({ text, route }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={route}>
      <ButtonStyle>{text}</ButtonStyle>
    </Link>
  );
};

export default Button;
