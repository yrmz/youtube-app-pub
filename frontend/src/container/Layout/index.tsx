import { Header } from 'component/layout/header';
import { SideBar } from 'component/layout/sidebar';
import { useSignOut } from 'hooks/auth';
import { PrivateContext } from 'hooks/context/privateContext';
import React, { useContext, useState } from 'react';
import { Container as BsContainer } from 'react-bootstrap';
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
    <div className={props.className}>
      <Header handleSignOut={signOut} />
      <BsContainer fluid>
        <SideBar
          tags={tags}
          showModal={showModal}
          tagService={tagService}
          handleModalToggle={handleModalToggle}
        />
        <div className="main-container">
          <main>{props.children}</main>
        </div>
      </BsContainer>
    </div>
  );
};

//Style層
export const Layout = styled(Container)`
  .main-container {
    margin-left: 250px;
    padding: 80px 0 0;
  }
`;
