//IMPLEMENT NEW COMPONENT TodoInput
import React from 'react';
import _ from 'lodash';

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority: 'Lowest',
      error: null,
      isEditing: false
    }

    //this way we make sure to get access to this object from the handleInputChange method too
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.setRandomColor = this.setRandomColor.bind(this);
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

    const validateInput = this.validateInput(this.state.todoTitle, this.state.todoResponsible, this.state.todoDescription);

    if (validateInput) {
      this.setState({ error: validateInput });
      return;
    }

    //props is an object of the component class which gives us access to all of the properties
    //we work here with one of the properties called onAddTodo
    //and we pass the current internal state object as a parameter (it has all the new values of our input form) in to this method
    this.props.onAddTodo(this.state);
    console.log('on add element', this.state);
    this.setState({
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority: 'Lowest',
      error: null
    });
  }

  validateInput(newTaskTitle, newTaskResponsible, newTaskDesc) {
    if (!newTaskTitle) {
      return 'Please enter a task.';
    } else if (_.find(this.props.todos, todo => todo.todoTitle === newTaskTitle)) {
      return 'Task already exists.';
    } else if (!newTaskResponsible) {
      return 'Please add the name of who is responsible for doing the task.';
    } else if (!newTaskDesc) {
      return 'Please add a description to the todo.';
    } else {
      return null;
    }
  }

  renderError() {
    if (!this.state.error) { return null; }

    return <div style={{ color: 'red' }}>{this.state.error}</div>;
  }

  render() {
    return (
      <div>
        <h4>Add New Todo</h4>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputTodoTitle" className="col-sm-2 control-label">TODO</label>
            <div className="col-sm-10">
              <input name="todoTitle"
                      className="form-control"
                      type="text"
                      autoComplete="off"
                      id="inputTodoTitle"
                      value={this.state.todoTitle}
                      onChange={this.handleInputChange}
                      placeholder="Title">
              </input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputTodoResponsible" className="col-sm-2 control-label">responsible</label>
            <div className="col-sm-10">
              <input name="todoResponsible"
                      className="form-control"
                      type="text"
                      autoComplete="off"
                      id="inputTodoResponsible"
                      value={this.state.todoResponsible}
                      onChange={this.handleInputChange}
                      placeholder="Responsible Preson">
              </input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputTodoDesc" className="col-sm-2 control-label">description</label>
            <div className="col-sm-10">
              <textarea name="todoDescription"
                      className="form-control"
                      row="3"
                      id="inputTodoDesc"
                      value={this.state.todoDescription}
                      onChange={this.handleInputChange}>
              </textarea>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputTodoPriority" className="col-sm-2 control-label">priority</label>
            <div className="col-sm-10">
              <select name="todoPriority"
                      className="form-control"
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
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" type="submit">Add Todo</button>
              {this.renderError()}
            </div>
          </div>
        </form>
      </div>
    )
  }
}