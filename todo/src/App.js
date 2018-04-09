import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoInput from './todo-input';
import _ from 'lodash';

// 1. ADD DATA MODEL TO THE APP
var todos;

// 2. SIGN DATA MODEL (make it avaliable) TO THE INTERNAL COMPONENT STATE
// every component has an internal component state which contains the data which is used by the component and the state is an object which can be modified 

class App extends Component {

  //first we SET THE INITIAL STATE IN THE CONSTRUCTOR in order to make the todos array available in the internal component state of our component
  constructor(props) {
    // CALLING SUPER YOU MAKE SURE THAT PROPS PARAMETER IS PASSED TO THE PARENT CONSTRUCTOR TOO
    super(props);

    // TODOS is available in state object now
    this.state = {
      todos: []
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

  handleSaveTodo(oldTitle, newTitle, oldResponsible, newResponsible, oldDesc, newDesc) {
    const foundTitle = _.find(this.state.todos, todo => todo.todoTitle === oldTitle);
    const foundResponsible = _.find(this.state.todos, todo => todo.todoResponsible === oldResponsible);
    const foundDesc = _.find(this.state.todos, todo => todo.todoDescription === oldDesc);
    foundTitle.todoTitle = newTitle;
    foundResponsible.todoResponsible = newResponsible;
    foundDesc.todoDescription = newDesc;
    this.setState({ todos: this.state.todos });
  }

  handleAddTodo(todo) {
    this.setState({todos: [...this.state.todos, todo]})
  }

  handleEditTodo(index) {
    if(this.state.todos[index].isEditing) { 
      return(
        <div>
          <input name="todoTitle"
                  type="text"
                  autoComplete="off"
                  id="inputTodoTitle"
                  defaultValue={this.state.todos[index].todoTitle}
                  ref="editInputTitle">
          </input>
          <input name="todoResponsible"
                  type="text"
                  autoComplete="off"
                  id="inputTodoResponsible"
                  defaultValue={this.state.todos[index].todoResponsible}
                  ref="editInputResponsible">
          </input>
          <textarea name="todoDescription"
                    row="3"
                    id="inputTodoDesc"
                    defaultValue={this.state.todos[index].todoDescription}
                    ref="editInputDesc" />
        </div>
      )
    }
    return(
      <div>
        <h4>{this.state.todos[index].todoTitle}<small><span>{this.state.todos[index].todoPriority}</span></small></h4>
                
        <p>{this.state.todos[index].todoResponsible}</p> 
        <p>{this.state.todos[index].todoDescription}</p> 
      </div>
    );
  }

  handleButtonChange(index) {
    if (this.state.todos[index].isEditing) {
      return (
        <td>
          <button onClick={this.onSaveClick.bind(this, index)}>Save</button>
          <button onClick={this.onCancelClick.bind(this, index)}>Cancel</button>
        </td>
      );
    }

    return (
      <td>
        <button onClick={this.onEditClick.bind(this, index)}>Edit</button>
      </td>
    );
  }

  onEditClick(index) {
    this.state.todos[index].isEditing = true;
    this.setState({ todos: this.state.todos })
  }

  onCancelClick(index) {
    this.state.todos[index].isEditing = false;
    this.setState({ todos: this.state.todos })
  }

  onSaveClick(index) {
    const oldTitle = this.state.todos[index].todoTitle;
    const newTitle = this.refs.editInputTitle.value;
    const oldResponsible = this.state.todos[index].todoResponsible;
    const newResponsible = this.refs.editInputResponsible.value;
    const oldDesc = this.state.todos[index].todoDescription;
    const newDesc = this.refs.editInputDesc.value;
    this.handleSaveTodo(oldTitle, newTitle, oldResponsible, newResponsible, oldDesc, newDesc);
    this.state.todos[index].isEditing = false;
    this.setState({ todos: this.state.todos })
  }


  render() {
    // ADAPT THE HTML OUTPUT SO TODOS IS RENDERED OUT
    return (
      <div>
        <TodoInput todos={this.state.todos} onAddTodo={this.handleAddTodo}></TodoInput>
        <hr/>
        <h4>Todo Count: <span>{this.state.todos.length}</span></h4>
        <ul>
          {this.state.todos.map((todo, index) =>
            <li key={index}>

              {this.handleEditTodo(index)}   

              <button onClick={this.handleRemoveTodo.bind(this, index)}>Delete</button>
              {this.handleButtonChange(index)}
            
              <div>
                <label htmlFor="inputTodoStatus"></label>
                <div>
                  <select name="todoStatus"
                          id="inputTodoStatus"
                          value={this.state.todoStatus}>
                    <option>Do</option>
                    <option>Doing</option>
                    <option>Done</option>
                  </select>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;