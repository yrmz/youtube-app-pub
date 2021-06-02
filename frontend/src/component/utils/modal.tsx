import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Type層
type Props = {
  className?: string;
  label: string | JSX.Element;
  title?: string;
  showModal: boolean;
  handleModalToggle: () => void;
};

// DOM層
const Component: React.FC<Props> = (props) => {
  return (
    <div className={props.className}>
      <Link to="#" onClick={props.handleModalToggle}>
        {props.label}
      </Link>
      <Modal show={props.showModal} onHide={props.handleModalToggle}>
        {props.title && (
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
        )}
        {props.children && <Modal.Body>{props.children}</Modal.Body>}
      </Modal>
    </div>
  );
};

//Style層
export const CustomModal = styled(Component)`
  display: inline-block;
`;
