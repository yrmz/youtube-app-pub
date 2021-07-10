import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  className?: string;
  handleSignOut: () => void;
};

const Component: React.FC<Props> = (props) => (
  <Navbar className={props.className} fixed="top">
    <Navbar.Brand>タイトル</Navbar.Brand>
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto"></Nav>
      <Nav>
        <Link to="#" onClick={props.handleSignOut}>
          SignOut
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

//Style層
export const Header = styled(Component)`
  background-color: #fff;
  border-bottom: 1px solid gray;
`;
