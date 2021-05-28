import React from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';

const NavBar = () => {
  return (
    <Navbar
      alignLinks="right"
      brand={
        <a className="brand-logo" href="#">
          Logo
        </a>
      }
      id="mobile-nav"
      menuIcon={<Icon>menu</Icon>}
      options={{
        draggable: true,
        edge: 'left',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true,
      }}
    >
      <NavItem href="/#/signup">Sign Up</NavItem>
      <NavItem href="/#/login">Log In</NavItem>
      {/* {user === 'anonymous' ? <NavItem href="/#/signup">Sign Up</NavItem> : ''}
      {user === 'anonymous' ? <NavItem href="/#/login">Log In</NavItem> : ''}
      {user === 'parent' ? <NavItem href="/#/">Notifications</NavItem> : ''}
      {user === 'parent' ? <NavItem href="/#/">Chores</NavItem> : ''}
      {user === 'parent' ? <NavItem href="/#/">Chat</NavItem> : ''}
      {user === 'parent' ? <NavItem href="/#/">Siblings</NavItem> : ''}
      {user === 'parent' ? <NavItem href="/#/">Settings</NavItem> : ''}
      {user === 'parent' ? <NavItem href="/#/">Sign Out</NavItem> : ''}
      {user === 'child' ? <NavItem href="/#/">Wish List</NavItem> : ''}
      {user === 'child' ? <NavItem href="/#/">Chores</NavItem> : ''}
      {user === 'child' ? <NavItem href="/#/">Chat</NavItem> : ''}
      {user === 'child' ? <NavItem href="/#/">Siblings</NavItem> : ''}
      {user === 'child' ? <NavItem href="/#/">Settings</NavItem> : ''}
      {user === 'child' ? <NavItem href="/#/">Sign Out</NavItem> : ''} */}
    </Navbar>
  );
};

export default NavBar;
