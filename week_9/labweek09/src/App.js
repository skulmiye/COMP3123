import React from 'react';
import Student from './components/Student';
import Welcome from './components/Welcome';
import College from './components/College';
import Logo from './components/Logo';
import './App.css';

function App() {
  return (
    <React.Fragment>
    <div className="App">
      <header className="App-header">
        <Logo/>
        <Welcome/>
        <Student id="101363605" fnm="Sabirin" lnm="Kulmiye"/>
        <College college="George Brown College" loc="Toronto"/>
      </header>
    </div>
    </React.Fragment>
  );
}

export default App;
