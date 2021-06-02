import { Router as Route } from 'container/router';
import { AuthProvider } from 'hooks/context/authenticationContext';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider pubRoot="/" authRoot="/app">
        <Route />
      </AuthProvider>
    </Router>
  );
}

export default App;
