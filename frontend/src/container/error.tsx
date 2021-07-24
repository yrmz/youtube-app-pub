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
      {context.error.status} {context.error.message}
    </div>
  );
};

export const ErrorPage = styled(Container)``;
