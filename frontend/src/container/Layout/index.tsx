import { Header } from 'component/layout/header';
import { SideBar } from 'component/layout/sidebar';
import { useSignOut } from 'hooks/backend/auth';
import { useTags } from 'hooks/backend/tag';
import { PrivateContext } from 'hooks/context/privateContext';
import React, { useContext, useState } from 'react';
import { Col, Container as BsContainer, Row } from 'react-bootstrap';
import styled from 'styled-components';

// Type層
type ContainerProps = {
  className?: string;
};

//Container層
const Container: React.FC<ContainerProps> = (props) => {
  const signOut = useSignOut();
  const [showModal, setShow] = useState(false);
  const handleModalToggle = () => setShow(!showModal);
  const context = useContext(PrivateContext);
  const [tags, tagService] = context.useTags;

  return (
    <BsContainer className={props.className} fluid>
      <Row>
        <Col>
          <Header handleSignOut={signOut} />
        </Col>
      </Row>
      <Row>
        <Col lg={2}>
          <SideBar
            tags={tags}
            showModal={showModal}
            tagService={tagService}
            handleModalToggle={handleModalToggle}
          />
        </Col>
        <Col>{props.children}</Col>
      </Row>
    </BsContainer>
  );
};

//Style層
export const Layout = styled(Container)``;
