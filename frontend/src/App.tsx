import { Router as Route } from 'container/router';
import { AuthProvider } from 'hooks/context/authenticationContext';
import { GlobalProvider } from 'hooks/context/globalContext';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider pubRoot="/" authRoot="/app">
        <GlobalProvider>
          <Route />
        </GlobalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
