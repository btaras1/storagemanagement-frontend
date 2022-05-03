import styled from "styled-components";
import { colors, breakpoints } from "../../lib/style/theme";

export const ModalWrapper = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const FormWrapper = styled.div`
  background-color: #fefefe;
  margin: 10px;
  padding: 20px;
  border: 1px solid #888;
  @media screen and (${breakpoints.mobileLarge}) {
    margin: 15px auto;
    max-width: 600px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  margin-bottom: 32px;
  color: ${colors.red};
  @media screen and (${breakpoints.mobileLarge}) {
    font-size: 24px;
  }
  @media screen and (${breakpoints.tablet}) {
    margin-bottom: 48px;
  }
  @media screen and (${breakpoints.desktop}) {
    font-size: 28px;
  }
  @media screen and (${breakpoints.desktopLarge}) {
    font-size: 32px;
  }
`;
