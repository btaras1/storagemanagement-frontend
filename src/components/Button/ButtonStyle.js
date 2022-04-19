import styled from "styled-components";
import { colors, transitionEase } from "../../lib/style/theme";

export const Button = styled.button`
  display: block;
  text-decoration: none;
  width: 100%;
  line-height: 40px;
  text-align: center;
  border: 1px solid ${colors.blue};
  border-radius: 6px;
  background: ${colors.blue};
  color: ${colors.white};
  transition: ${transitionEase};
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  &:hover {
    cursor: pointer;
    border-color: ${colors.yellow};
    background: ${colors.yellow};
  }
  &:focus {
    outline: none;
  }
`;
