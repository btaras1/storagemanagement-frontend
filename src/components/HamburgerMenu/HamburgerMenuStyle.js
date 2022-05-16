import styled from 'styled-components';
import {
    colors,
    transitionEase
} from '../../lib/style/theme';
import { NavLink } from 'react-router-dom';

export const HambWrapper = styled.header`
    background-color: ${colors.white};
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
`;
export const NavItem = styled(NavLink)`
    &:hover {
        color: ${colors.red};
    }    &:last-child {
        margin-right: 0;
    }   
    &.active {
        color: ${colors.red};
    }
        display: inline-block;
        text-decoration: none;
        color: ${colors.black};
        line-height: 50px;
        font-weight: 600;
        font-size: 16px;
        margin: 15px 0;
        transition: ${transitionEase};
    `;