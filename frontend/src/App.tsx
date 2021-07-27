import { ErrorPage } from 'container/error';
import { Router as Route } from 'container/router';
import { AuthProvider } from 'hooks/context/authenticationContext';
import { GlobalProvider } from 'hooks/context/globalContext';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from '@sentry/react';

function App() {
  console.log(process.env.NODE_ENV);
  return (
    // <ErrorBoundary fallback="error" showDialog>
    <Router>
      <AuthProvider pubRoot="/" authRoot="/app">
        <GlobalProvider>
          <Route />
        </GlobalProvider>
      </AuthProvider>
    </Router>
    // </ErrorBoundary>
  );
}

export default App;
