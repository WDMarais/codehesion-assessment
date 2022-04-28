import React from 'react';

import './App.css';
import Header from './components/header';
import SignupForm from './components/signupForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <SignupForm />
    </div>
  );
}

export default App;
