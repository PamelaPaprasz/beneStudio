import React, { Component } from 'react';
import TodoInput from './todo-input';
import './App.css';
import _ from 'lodash';
import FlipMove from "react-flip-move";



// 1. ADD DATA MODEL TO THE APP
let todos = [{
    todoTitle: 'title',
    todoResponsible: 'person',
    todoDescription: 'description',
    todoStatus: 'do'
}];
let randomColor;

localStorage.setItem('todos', JSON.stringify(todos))

// 2. SIGN DATA MODEL (make it avaliable) TO THE INTERNAL COMPONENT STATE
// every component has an internal component state which contains the data which is used by the component and the state is an object which can be modified 

class App extends Component {

  //first we SET THE INITIAL STATE IN THE CONSTRUCTOR in order to make the todos array available in the internal component state of our component
  constructor(props) {
    // CALLING SUPER YOU MAKE SURE THAT PROPS PARAMETER IS PASSED TO THE PARENT CONSTRUCTOR TOO
    super(props);

    // TODOS is available in state object now
    this.state = {
      todos: JSON.parse(localStorage.getItem('todos')),
      randomColor: 'yellow'
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
    this.setRandomColor();
  }

  handleEditTodo(index) {
    if(this.state.todos[index].isEditing) { 
      return(
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputTodoTitle" className="control-label">TODO</label>
            <div className="col-sm-10">
              <input name="todoTitle"
                      className="form-control"
                      type="text"
                      autoComplete="off"
                      id="inputTodoTitle"
                      defaultValue={this.state.todos[index].todoTitle}
                      ref="editInputTitle">
              </input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputTodoResponsible" className="control-label">responsible</label>
            <div className="col-sm-10">
              <input name="todoResponsible"
                      className="form-control"
                      type="text"
                      autoComplete="off"
                      id="inputTodoResponsible"
                      defaultValue={this.state.todos[index].todoResponsible}
                      ref="editInputResponsible">
              </input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputTodoDesc" className="control-label">description</label>
            <div className="col-sm-10">
              <textarea name="todoDescription"
                        className="form-control"
                        row="3"
                        id="inputTodoDesc"
                        defaultValue={this.state.todos[index].todoDescription}
                        ref="editInputDesc" />
            </div>
          </div>
        </form>
      )
    }
    return(
      <div>
        <h4 className="list-group-item-heading">{this.state.todos[index].todoTitle} <small><span className="label label-info">{this.state.todos[index].todoPriority}</span></small></h4>
                
        <p><span className="glyphicon glyphicon-user"></span> {this.state.todos[index].todoResponsible}</p> 
        <p>{this.state.todos[index].todoDescription}</p> 
      </div>
    );
  }

  handleButtonChange(index) {
    if (this.state.todos[index].isEditing) {
      return (
        <span>
          <button className="btn btn-success btn-sm" onClick={this.onSaveClick.bind(this, index)}><span className="glyphicon glyphicon-ok"></span></button>
          <button className="btn btn-warning btn-sm" onClick={this.onCancelClick.bind(this, index)}><span className="glyphicon glyphicon-remove"></span></button>
        </span>
      );
    }

    return (
        <button className="btn btn-info btn-sm" onClick={this.onEditClick.bind(this, index)}><span className="glyphicon glyphicon-pencil"></span></button>
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

  setRandomColor() {
    randomColor = "#"+((1<<24)*Math.random()|0).toString(16);
    this.state.randomColor = randomColor;
    this.setState({randomColor: this.state.randomColor});
  }

  render() {
    // ADAPT THE HTML OUTPUT SO TODOS IS RENDERED OUT
    return (
      <div className="container">
        <TodoInput todos={this.state.todos} onAddTodo={this.handleAddTodo}></TodoInput>
        <hr/>
        <div className="container">
          <h4>All Todo: <span className="badge badge-pill">{this.state.todos.length}</span></h4>
          <ul className="list-group">
            <FlipMove duration={250} easing="ease-out" class="list">
              {this.state.todos.map((todo, index) =>
                <li key={index} className="list-group-item todo-el" style={{background: randomColor}}>

                  {this.handleEditTodo(index)}   

                  <button className="btn btn-danger btn-sm" onClick={this.handleRemoveTodo.bind(this, index)}><span className="glyphicon glyphicon-trash"></span></button>
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
            </FlipMove>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;