import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  className?: string;
  handleSignOut: () => void;
};

const Component: React.FC<Props> = (props) => (
  <div className={props.className}>
    <Button className="float-right" onClick={() => props.handleSignOut()}>
      SignOut
    </Button>
  </div>
);

//Style層
export const Header = styled(Component)``;
