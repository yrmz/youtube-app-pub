import React from 'react';
import { Container as BsContainer, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

// Type層
type ContainerProps = {};

const Component: React.FC = (props) => {
  return (
    <BsContainer>
      <div className="vh-100 text-center d-flex flex-column align-items-center justify-content-center">
        <Spinner animation="border" role="status" />
        <div className="m-2">loading...</div>
      </div>
    </BsContainer>
  );
};

//Style層
const StyledComponent = styled(Component)``;

//Container層
const Container: React.FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};

export default Container;
