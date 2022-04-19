import styled from "styled-components";
import { colors, breakpoints } from "../../lib/style/theme";

export const Footer = styled.footer`
  background: ${colors.darkGrey};
  padding: 20px;
  @media screen and (${breakpoints.tablet}) {
    padding: 30px;
  }
`;
export const Copyright = styled.p`
  color: ${colors.lightGrey};
  text-align: center;
  font-size: 12px;
  @media screen and (${breakpoints.tablet}) {
    font-size: 14px;
  }
`;
