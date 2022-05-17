import React, { useEffect } from "react";
import LogoImage from "../../assets/images/logo.png";
import {
  HeaderWrapper,
  Inner,
  Logo,
  LogoContainer,
  Nav,
  NavItem,
  Hamburger,
  HamburgerLine,
} from "./HeaderStyle";

const Header = (props) => {
  useEffect(() => {
        console.log(props.isAdmin);
  }, []);
  return (
    <>
      <HeaderWrapper>
        <Inner>
          <LogoContainer to="/">
            <Logo src={LogoImage} alt="Posavac prozori i vrata logo" />
          </LogoContainer>
          {props.isLoggedIn == true && (
            <>
              <Hamburger onClick={() => props.setHamburgerMenu()}>
                <HamburgerLine />
                <HamburgerLine />
                <HamburgerLine />
              </Hamburger>

              <Nav>
                {props.isAdmin &&
                <>
                <NavItem exact to="/"> Početna </NavItem>
                <NavItem to="/items"> Artikli </NavItem>
                <NavItem to="/sales"> Stanje </NavItem>
                <NavItem to="/procurement"> Nabava </NavItem>
                <NavItem to="/receipts"> Prodaja </NavItem>
                </>
                }
                <NavItem to="/mount"> Montaže </NavItem>
                {props.isAdmin &&
                <>
                <NavItem to="/buyers"> Kupci </NavItem>
                <NavItem to="/other"> Ostalo </NavItem>
                <NavItem to="/management"> Korisnici </NavItem>
                </>
                }
                <NavItem to="/logout" onClick={() => props.onLogout()}>
                  Odjava
                </NavItem>
              </Nav>
            </>
          )}
        </Inner>
      </HeaderWrapper>
    </>
  );
};

export default Header;
