import React from 'react';
import styled from 'styled-components';

// Type層
type ContainerProps = {};
type Props = {
  className?: string;
} & ContainerProps;

// DOM層
const Component: React.FC<Props> = (props) => {
  return <div className={props.className}></div>;
};

//Style層
const StyledComponent = styled(Component)``;

//Container層
const Container: React.FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};

export default Container;
