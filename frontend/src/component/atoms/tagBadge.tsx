import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ContainerProps = {
  className?: string;
  name: string;
  onClick: () => void;
};

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <Badge className={props.className} variant="info">
      {props.name && <span className="name">{props.name}</span>}
      <Link to="#" onClick={props.onClick}>
        <FontAwesomeIcon icon={faTimes} size="1x" />
      </Link>
    </Badge>
  );
};

export const TagBadge = styled(Container)`
  vertical-align: middle;
  height: 2em;
  min-width: 2em;
  margin: 1px 3px;
  .name {
    font-size: 1.25em;
    padding: 0 5px;
  }
`;
