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

    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  // IMPLEMENT handleRemoveTodo

  handleRemoveTodo(index) {
    // modifying the state of the component in order to move the current todo item from the todos array
    this.setState({
      //passing a new value to todos array by filtering through the recent state of todos array
      todos: this.state.todos.filter(function(e, i){
        //all of the element will be returned ad added to the new array which is returned by the filter function which has no the same index as the element we want to delete
        return i !== index;
      })
    })
  }

  handleAddTodo(todo) {
    this.setState({todos: [...this.state.todos, todo]})
  }


  render() {
    // ADAPT THE HTML OUTPUT SO TODOS IS RENDERED OUT
    return (
      <div>
        <TodoInput onAddTodo={this.handleAddTodo}></TodoInput>
        <hr/>
        <h4>Todo Count: <span>{this.state.todos.length}</span></h4>
        <ul>
          {this.state.todos.map((todo, index) =>
            <li key={index}>
              <h4>{todo.todoTitle}<small><span>{todo.todoPriority}</span></small></h4>
              
              <p>{todo.todoResponsible}</p>
              <p>{todo.todoDescription}</p>

              <button onClick={this.handleRemoveTodo.bind(this, index)}>Delete</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

//IMPLEMENT NEW COMPONENT TodoInput
class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority: 'Lowest'
    }

    //this way we make sure to get access to this object from the handleInputChange method too
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    //in order to prevent the default behavior of submit event
    event.preventDefault();
    //props is an object of the component class which gives us access to all of the properties
    //we work here with one of the properties called onAddTodo
    //and we pass the current internal state object as a parameter (it has all the new values of our input form) in to this method
    this.props.onAddTodo(this.state);
    this.setState({
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority: 'Lowest'
    });
  }

  render() {
    return (
      <div>
        <h4>Add New Todo</h4>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="inputTodoTitle"></label>
            <div>
              <input name="todoTitle"
                      type="text"
                      id="inputTodoTitle"
                      value={this.state.todoTitle}
                      onChange={this.handleInputChange}
                      placeholder="Title">
              </input>
            </div>
          </div>
          <div>
            <label htmlFor="inputTodoResponsible"></label>
            <div>
              <input name="todoTitle"
                      type="text"
                      id="inputTodoResponsible"
                      value={this.state.todoResponsible}
                      onChange={this.handleInputChange}
                      placeholder="Responsible Preson">
              </input>
            </div>
          </div>
          <div>
            <label htmlFor="inputTodoDesc"></label>
            <div>
              <textarea name="todoDescription"
                      row="3"
                      id="inputTodoDesc"
                      value={this.state.todoDescription}
                      onChange={this.handleInputChange}>
              </textarea>
            </div>
          </div>
          <div>
            <label htmlFor="inputTodoPriority"></label>
            <div>
              <select name="todoPriority"
                      id="inputTodoPriority"
                      value={this.state.todoPriority}
                      onChange={this.handleInputChange}>
                  <option>Lowest</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Highest</option>
              </select>
            </div>
          </div>
          <div>
            <button type="submit">Add Todo</button>
          </div>
        </form>
      </div>
    )
  }
}

export default App;
