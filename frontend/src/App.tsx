import { ErrorPage } from 'container/error';
import { Router as Route } from 'container/router';
import { AuthProvider } from 'hooks/context/authenticationContext';
import { GlobalProvider } from 'hooks/context/globalContext';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from '@sentry/react';

function App() {
  return (
    // <ErrorBoundary fallback="error" showDialog>
    <Router>
      <AuthProvider pubRoot="/" authRoot="/app">
        {/* <button onClick={methodDoesNotExist}>Break the world</button> */}
        <GlobalProvider>
          <Route />
        </GlobalProvider>
      </AuthProvider>
    </Router>
    // </ErrorBoundary>
  );
}

export default App;
