import styled from "styled-components";

import { breakpoints } from "../../lib/style/theme";
//import backgroundDesktop from './../../assets/images/login/background-desktop.svg';
//import backgroundTablet from './../../assets/images/login/background-tablet.svg';

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
  
`;

export const LogoContainer = styled.div`
  display: block;
  width: 100%;
  @media screen and (${breakpoints.mobileLarge}) {
    width: 445px;
  }
  @media screen and (${breakpoints.tablet}) {
    width: 471px;
  }
  @media screen and (${breakpoints.desktop}) {
    width: 539px;
  }
`;

export const Inner = styled.div`
  width: 100%;
  padding: 16px;
  @media screen and (${breakpoints.tablet}) {
    width: 232px;
  }
`;
