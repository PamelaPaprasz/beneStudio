import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// 1. ADD DATA MODEL TO THE APP
var todos = [
  {
    todoTitle: 'My first todo',
    todoResponsible: 'Pami',
    todoDescription: 'My first todo description',
    todoPriority: 'low'
  },
  {
    todoTitle: 'My second todo',
    todoResponsible: 'Pami',
    todoDescription: 'My second todo description',
    todoPriority: 'medium'
  },
  {
    todoTitle: 'My third todo',
    todoResponsible: 'Pami',
    todoDescription: 'My third todo description',
    todoPriority: 'heigh'
  }
];

// 2. SIGN DATA MODEL (make it avaliable) TO THE INTERNAL COMPONENT STATE
// every component has an internal component state which contains the data which is used by the component and the state is an object which can be modified 

class App extends Component {

  //first we SET THE INITIAL STATE IN THE CONSTRUCTOR in order to make the todos array available in the internal component state of our component
  constructor(props) {
    // CALLING SUPER YOU MAKE SURE THAT PROPS PARAMETER IS PASSED TO THE PARENT CONSTRUCTOR TOO
    super(props);

    this.state = {
      todos
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
