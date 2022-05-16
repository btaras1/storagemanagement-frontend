import React from 'react';


import {NavItem, HambWrapper} from './HamburgerMenuStyle'

const HamburgerMenu = (props) => {
    return (
            
  
                    <HambWrapper>
                        <NavItem exact to="/" onClick={()=>props.setHamburgerMenu()}> Početna </NavItem>
                <NavItem to="/items" onClick={()=>props.setHamburgerMenu()}> Artikli </NavItem>
                <NavItem to="/sales" onClick={()=>props.setHamburgerMenu()}> Stanje </NavItem>
                <NavItem to="/procurement" onClick={()=>props.setHamburgerMenu()}> Nabava </NavItem>
                <NavItem to="/receipts" onClick={()=>props.setHamburgerMenu()}> Prodaja </NavItem>
                <NavItem to="/mount" onClick={()=>props.setHamburgerMenu()}> Montaže </NavItem>
                <NavItem to="/buyers" onClick={()=>props.setHamburgerMenu()}> Kupci </NavItem>
                <NavItem to="/other" onClick={()=>props.setHamburgerMenu()}> Ostalo </NavItem>
                <NavItem to="/management" onClick={()=>props.setHamburgerMenu()}> Korisnici </NavItem>
                {props.isAdmin && <NavItem to="/users" onClick={()=>props.setHamburgerMenu()}>Korisnici</NavItem>}
                <NavItem to="/logout" onClick={() => props.onLogout()}>
                  Odjava
                </NavItem>
                    </HambWrapper>

            
    );
}

export default HamburgerMenu;