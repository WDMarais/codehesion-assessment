import React, { useState } from 'react';
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
  const [accessToken, setAccessToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const setLoginData = (loginData) => {
    console.log("Hello");
    console.log(loginData);
    let token = loginData.token;
    if (token && token != '') {
      setAccessToken(accessToken);
      setLoggedIn(true);
    } else {
      setAccessToken('');
      setLoggedIn(false);
    }
  }

  return ( //TODO: Block off Menus path when not logged in - login issues, so I'm leaving it in for demo purposes
    <div className="App">
      <header className="App-header">
        <Header props={{loggedIn: loggedIn}}/>
      </header>
      <Router>
        <Routes>
          {!loggedIn && <Route exact path="/signup" element={<SignupForm />}/>}
          {!loggedIn && <Route exact path="/login" element={
            <LoginForm setParentState={setLoginData}/>
          }/>}
          <Route exact path="/menus" element={<Menus />}/>
          {!loggedIn && <Route path="/" element={<Entry />}/>}
          {loggedIn && <Route path="/" element={<Menus />}/>}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
