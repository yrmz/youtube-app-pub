import { GlobalContext } from 'hooks/context/globalContext';
import React, { useContext } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  className?: string;
};

const Container: React.FC<ContainerProps> = (props) => {
  const context = useContext(GlobalContext);

  return (
    <div className={props.className}>
      <h2>{context.error.status}</h2>
      <h2>{context.error.message}</h2>
    </div>
  );
};

export const ErrorPage = styled(Container)`
  text-align: center;
  color: #c35757;
`;
