import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Header from './components/header';
import Entry from './components/entry';
import Menus from './components/menus';
import SignupForm from './components/signupForm';
import LoginForm from './components/loginForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Router>
        <Routes>
          <Route exact path="/signup" element={<SignupForm />}/>
          <Route exact path="/login" element={<LoginForm />}/>
          <Route exact path="/menus" element={<Menus />}/>
          <Route path="/" element={<Entry />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
