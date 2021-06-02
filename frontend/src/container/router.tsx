import { ChannelList } from 'container/channel/index';
import { Layout } from 'container/Layout/index';
import Callback from 'container/signin/callback';
import Signin from 'container/signin/signin';
import { AuthContext } from 'hooks/context/authenticationContext';
import { PrivateProvider } from 'hooks/context/privateContext';
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

type ContainerProps = {};
type RouterProps = {
  private: { path: string; Component: React.FC }[];
  public: { path: string; Component: React.FC }[];
};

const routerProps: RouterProps = {
  private: [
    { path: "/app", Component: ChannelList },
    { path: "/app/list/:tagId", Component: ChannelList },
  ],
  public: [
    { path: "/callback", Component: Callback },
    { path: "/", Component: Signin },
  ],
};

const Container: React.FC<ContainerProps> = (props) => {
  const authContext = useContext(AuthContext);
  if (authContext?.session) {
    return (
      <Switch>
        <PrivateProvider>
          <Layout>
            {routerProps.private.map(({ path, Component }, idx) => (
              <Route key={idx} exact={true} path={path}>
                <Component />
              </Route>
            ))}
          </Layout>
        </PrivateProvider>
      </Switch>
    );
  } else {
    return (
      <Switch>
        {routerProps.public.map(({ path, Component }, idx) => (
          <Route exec path={path}>
            <Component />
          </Route>
        ))}
      </Switch>
    );
  }
};

//Style層
export const Router = styled(Container)``;
