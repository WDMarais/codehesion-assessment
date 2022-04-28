import React from 'react';

import './App.css';
import Header from './components/header';
import Entry from './components/entry';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Entry />
    </div>
  );
}

export default App;
