import { useSigninUrl } from 'hooks/auth';
import SigninButton from 'image/btn_google_signin_light_normal.png';
import SigninedButton from 'image/btn_google_signin_light_pressed.png';
import React, { useState } from 'react';
import { Container as BsContainer, Image } from 'react-bootstrap';
import styled from 'styled-components';

// Type層
type ContainerProps = {};
type Props = {
  className?: string;
  signinUrl: string;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
} & ContainerProps;

// DOM層
const Component: React.FC<Props> = (props) => {
  return (
    <div className={props.className}>
      <BsContainer>
        <div className="vh-100 text-center d-flex flex-column align-items-center justify-content-center">
          <div className="h-50">
            <div className="m-4">
              <h1>Channel Folder</h1>
            </div>
            <div>
              <a
                href={props.signinUrl}
                onMouseDown={() => props.setIsClicked(true)}
                onMouseUp={() => props.setIsClicked(false)}
              >
                <Image
                  src={props.isClicked ? SigninedButton : SigninButton}
                  className="w-75"
                />
              </a>
            </div>
          </div>
        </div>
      </BsContainer>
    </div>
  );
};

//Style層
const StyledComponent = styled(Component)``;

//Container層
const Container: React.FC<ContainerProps> = (props) => {
  const signinUrl = useSigninUrl();
  const [isClicked, setIsClicked] = useState(false);
  return (
    <StyledComponent
      {...props}
      signinUrl={signinUrl}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
    />
  );
};

export default Container;
