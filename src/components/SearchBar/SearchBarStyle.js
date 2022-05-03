import styled from "styled-components";
import { colors, breakpoints } from "../../lib/style/theme";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  @media screen and (${breakpoints.tablet}) {
    padding: 0 15px;
  }
`;
export const SearchBar = styled.input`
    width: 100%;
    border: 1px solid ${colors.lightGrey};
    border-radius: 6px;
    line-height: 40px;
    outline: none;
    font-size: 14px;
    &:focus{
        border-color: ${colors.yellow};
    }
    @media screen and (${breakpoints.mobileLarge}) {
        padding 0;
        width: 400px;
    }    
    @media screen and (${breakpoints.desktop}) {
        font-size: 16px;
    }
`;
