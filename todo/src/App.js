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

    // TODOS is available in state object now
    this.state = {
      todos
    };
  }

  render() {
    // ADAPT THE HTML OUTPUT SO TODOS IS RENDERED OUT
    return (
      <div>
        <h4>Todo Count: <span>{this.state.todos.length}</span></h4>
        <ul>
          {this.state.todos.map((todo, index) =>
            <li key={index}>
              <h4>{todo.todoTitle}<small><span>{todo.todoPriority}</span></small></h4>
              
              <p>{todo.todoResponsible}</p>
              <p>{todo.todoDescription}</p>

              <button>Delete</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
