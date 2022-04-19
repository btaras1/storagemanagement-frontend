import styled, { css } from "styled-components";
import {
  colors,
  breakpoints,
  boxShadow,
  boxShadowHover,
} from "../../lib/style/theme";

export const Table = styled.table`
  border-collapse: collapse;
  margin: 25px auto;
  table-layout: fixed;
  white-space: nowrap;
  max-width: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${boxShadowHover};
`;
export const PuppyTable = styled.table`
  border-collapse: collapse;
  margin: 25px auto;
  table-layout: fixed;
  white-space: nowrap;
  max-width: 100%;

  overflow: hidden;
  box-shadow: ${boxShadowHover};
`;
export const THead = styled.thead`
  background-color: ${colors.red};
  width: 100%;
`;

export const TableBody = styled.tbody`
  width: 100%;
`;
export const TableRow = styled.tr`
  width: 100%;
  :nth-of-type(even) {
    background-color: #f8f8f8;
  }
`;
export const TableHead = styled.th`
  color: ${colors.white};
  line-height: 40px;
  padding: 12px 15px;
  width: 15%;
  text-align: left;
  @media screen and (max-width: 576px) {
    ${(props) =>
      props.dog === true &&
      css`
        :nth-child(n + 4) {
          display: none;
        }
      `}
    ${(props) =>
      props.mating === true &&
      css`
        :nth-child(n + 4) {
          display: none;
        }
      `}
 ${(props) =>
      props.litter === true &&
      css`
        :nth-child(n + 4):nth-child(-n + 7) {
          display: none;
        }
      `}
 ${(props) =>
      props.puppy === true &&
      css`
        :nth-child(n+5)) {
          display: none;
        }
      `}
 ${(props) =>
      props.buyer === true &&
      css`
        :nth-child(n + 2):nth-child(-n + 3) {
          display: none;
        }
        :nth-child(n + 5) {
          display: none;
        }
      `}
 ${(props) =>
      props.user === true &&
      css`
        :nth-child(n + 2):nth-child(-n + 2) {
          display: none;
        }
        :nth-child(n + 4) {
          display: none;
        }
      `}
  }
  @media screen and (${breakpoints.mobileLarge}) and (max-width: 768px) {
    ${(props) =>
      props.dog === true &&
      css`
        :nth-child(n + 3):nth-child(-n + 5) {
          display: none;
        }
      `}
    ${(props) =>
      props.litter === true &&
      css`
        :nth-child(n + 4):nth-child(-n + 7) {
          display: none;
        }
      `}
  ${(props) =>
      props.buyer === true &&
      css`
  :nth-child(n+5):nth-child(-n+7){
   display: none;
 }
 :nth-child(2){
   display: none;
 }
 }
  `}
  ${(props) =>
      props.user === true &&
      css`
        :nth-child(n + 2):nth-child(-n + 2) {
          display: none;
        }
        :nth-child(n + 4) {
          display: none;
        }
      `}
  }
`;

export const TableData = styled.td`
  padding: 12px 15px;
  line-height: 40px;
  width: 15%;
  text-align: left;
  @media screen and (max-width: 576px) {
    ${(props) =>
      props.dog === true &&
      css`
        :nth-child(n + 4):nth-child(-n + 5) {
          display: none;
        }
      `}
    ${(props) =>
      props.mating === true &&
      css`
        :nth-child(n + 4) {
          display: none;
        }
      `}
 ${(props) =>
      props.litter === true &&
      css`
        :nth-child(n + 4) {
          display: none;
        }
      `}
 ${(props) =>
      props.buyer === true &&
      css`
 :nth-child(n+2):nth-child(-n+3){
  display: none;
}
:nth-child(n+5){
  display: none;
}
}
 `}
 ${(props) =>
      props.user === true &&
      css`
        :nth-child(n + 2):nth-child(-n + 2) {
          display: none;
        }
      `}
 ${(props) =>
      props.puppy === true &&
      css`
        :nth-child(n + 3) {
          display: none;
        }
      `}
  }
  @media screen and (${breakpoints.mobileLarge}) and (max-width: 768px) {
    ${(props) =>
      props.dog === true &&
      css`
        :nth-child(n + 3):nth-child(-n + 3) {
          display: none;
        }
      `}
    ${(props) =>
      props.litter === true &&
      css`
    :nth-child(n+4){
      display: none;
    `}
   
   ${(props) =>
      props.inside === true &&
      css`
        column-span: all;
      `}
   ${(props) =>
      props.buyer === true &&
      css`
   :nth-child(n+5):nth-child(-n+7){
    display: none;
  }
  :nth-child(2){
    display: none;
  }
  }
   `}
   ${(props) =>
      props.user === true &&
      css`
        :nth-child(n + 2):nth-child(-n + 2) {
          display: none;
        }
      `}
  }
`;

export const DeleteTableData = styled.td`
  ${(props) =>
    props.dog === true &&
    css`
      @media screen and (max-width: 576px) {
        :nth-child(n + 1) {
          display: none;
        }
      }
    `}
  ${(props) =>
    props.mating === true &&
    css`
      @media screen and (max-width: 576px) {
        :nth-child(n + 1) {
          display: none;
        }
      }
    `}
  ${(props) =>
    props.user === true &&
    css`
      @media screen and (max-width: 576px) {
        :nth-child(n + 1) {
          display: none;
        }
      }
    `}
  ${(props) =>
    props.litter === true &&
    css`
      @media screen and (max-width: 576px) {
        :nth-child(n + 3):nth-child(-n + 6) {
          display: none;
        }
        :nth-child(8) {
          display: none;
        }
      }
    `}
    @media screen and (${breakpoints.mobileLarge}) and (max-width: 768px) {
    ${(props) =>
      props.dog === true &&
      css`
        :nth-child(n + 1) {
          display: none;
        }
      `}

    ${(props) =>
      props.user === true &&
      css`
        :nth-child(n) {
          display: none;
        }
      `}
  ${(props) =>
      props.litter === true &&
      css`
        :nth-child(n + 3):nth-child(-n + 6) {
          display: none;
        }
        :nth-child(8) {
          display: none;
        }
      `}
  }
  padding: 12px 15px;
  line-height: 40px;
  width: 15%;
  text-align: left;
  padding-top: 20px;
  :hover {
    color: ${colors.red};
  }
`;

export const Text = styled.p`
  text-align: center;
  padding: 12px 15px;
`;

export const PuppyWrapper = styled.div``;
