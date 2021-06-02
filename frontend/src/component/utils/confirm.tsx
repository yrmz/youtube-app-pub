import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Type層
type Props = {
  className?: string;
  label: string;
  onClickOk: () => void;
};

// DOM層
const Component: React.FC<Props> = (props) => {
  const [isShow, setShow] = useState(false);
  const handleModalToggle = () => {
    setShow(!isShow);
  };

  return (
    <div className={props.className}>
      <Link to="#" onClick={handleModalToggle}>
        {props.label}
      </Link>
      <Modal
        show={isShow}
        onHide={handleModalToggle}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Comfirm</Modal.Title>
        </Modal.Header>
        {props.children && <Modal.Body>{props.children}</Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalToggle}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.onClickOk();
              handleModalToggle();
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

//Style層
export const Confirm = styled(Component)``;
