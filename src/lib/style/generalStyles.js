import styled, { css } from "styled-components";
import { colors, breakpoints } from "../../lib/style/theme";

export const Grid = styled.div`
  display: grid;
  row-gap: 32px;
  @media screen and (${breakpoints.mobileLarge}) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 32px;
  }
  @media screen and (${breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
    ${(props) => props.columns === 3 && "padding: 0 32px"}
  }
  @media screen and (${breakpoints.desktopLarge}) {
    ${(props) =>
      props.columns === 4 &&
      css`
        grid-template-columns: repeat(4, 1fr);
        max-width: 1280px;
      `}
    ${(props) => props.columns === 3 && "padding: 0 84px;"}
  }
`;

export const Main = styled.main`
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (${breakpoints.mobileLarge}) {
    width: 400px;
    margin: 0 auto;
  }
`;

export const FormRow = styled.div`
  margin-bottom: 32px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
  @media screen and (${breakpoints.desktop}) {
    font-size: 16px;
  }
`;

export const InputText = styled.input`
  border: 1px solid ${colors.lightGrey};
  border-radius: 6px;
  width: 100%;
  line-height: 40px;
  padding: 0 10px;
  outline: none;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;

  &:focus {
    border-color: ${colors.yellow};
  }
  @media screen and (${breakpoints.desktop}) {
    font-size: 16px;
  }
`;
export const InputTextArea = styled.textarea`
  border: 1px solid ${colors.lightGrey};
  border-radius: 6px;
  width: 100%;
  line-height: 40px;
  padding: 0 10px;
  outline: none;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;

  &:focus {
    border-color: ${colors.yellow};
  }
  @media screen and (${breakpoints.desktop}) {
    font-size: 16px;
  }
`;
export const SelectText = styled.select`
  height: 40px;
  border: 1px solid ${colors.lightGrey};
  border-radius: 6px;
  width: 100%;
  line-height: 40px;
  padding: 0 10px;
  outline: none;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;

  &:focus {
    border-color: ${colors.yellow};
  }
  @media screen and (${breakpoints.desktop}) {
    font-size: 16px;
  }
`;
export const OptionText = styled.option`
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  border: 1px solid ${colors.lightGrey};
  border-radius: 6px;
  width: 100%;
  line-height: 150%;
  padding: 10px;
  outline: none;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  min-width: 100%;
  &:focus {
    border-color: ${colors.yellow};
  }
  @media screen and (${breakpoints.desktop}) {
    font-size: 16px;
  }
`;

export const InputCheckbox = styled.input`
  margin-right: 12px;
  width: 18px;
  height: 18px;
`;

export const InputError = styled.p`
  font-size: 14px;
  color: ${colors.red};
  padding-top: 8px;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  margin-bottom: 32px;
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
export const AddButton = styled.button`
  border: 2px solid ${colors.black};
  background-color: ${colors.white};
  color: ${colors.black};
  padding: 9px 80px;
  font-size: 13px;
  cursor: pointer;
  border-radius: 0.317rem;
  font-weight: 700;
  :hover {
    color: #32cd32;
    border: 2px solid #32cd32;
  }
`;

export const SuccessMessage = styled.p`
  margin: 0 auto;
  padding: 15px;
  margin-bottom: 32px;
  border-radius: 6px;
  background: ${colors.successBackground};
  color: ${colors.success};
  ${(props) =>
    props.isError &&
    `
        background: ${colors.errorBackground};
        color: ${colors.error};
    `};
  @media screen and (${breakpoints.mobileLarge}) {
    max-width: 400px;
  }
`;

export const Button = styled.button`
  border: 2px solid ${colors.black};
  background-color: ${colors.white};
  color: ${colors.black};
  padding: 9px 80px;
  font-size: 13px;
  cursor: pointer;
  border-radius: 0.317rem;
  font-weight: 700;
  :hover {
    color: #32cd32;
    border: 2px solid #32cd32;
  }
`;
