import styled from "styled-components";
import { colors, breakpoints } from "../../lib/style/theme";

export const Form = styled.form`
  display: block;
  flex-direction: column;
  width: 100%;
  @media screen and (${breakpoints.mobileLarge}) {
    margin: 0 auto;
  }
`;
export const FormOneRow = styled.div`
  margin-bottom: 32px;
  &:last-child {
    margin-bottom: 0;
    margin-top: 10px;
    width: 100%;
  }
`;
export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 32px;
  &:last-child {
    margin-bottom: 0;
    margin-top: 10px;
    width: 100%;
  }
`;

export const LeftColumn = styled.div`
  flex: 100%;
  flex-direction: column;
  margin: 10px 5px;
  @media screen and (${breakpoints.mobileLarge}) {
    flex: 48%;
  }
`;
export const RightColumn = styled.div`
  flex: 100%;
  flex-direction: column;
  margin: 10px 0;

  @media screen and (${breakpoints.mobileLarge}) {
    flex: 48%;
  }
`;

export const CheckboxWrapper = styled.div`
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
