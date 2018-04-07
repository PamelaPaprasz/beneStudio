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
      error: null
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

    const validateInput = this.validateInput(this.state.todoTitle);

    if (validateInput) {
      this.setState({ error: validateInput });
      return;
    }

    //props is an object of the component class which gives us access to all of the properties
    //we work here with one of the properties called onAddTodo
    //and we pass the current internal state object as a parameter (it has all the new values of our input form) in to this method
    this.props.onAddTodo(this.state);
    this.setState({
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority: 'Lowest',
      error: null
    });
  }

  validateInput(newTaskTitle) {
    if (!newTaskTitle) {
      return 'Please enter a task.';
    } else if (_.find(this.props.todos, todo => todo.todoTitle === newTaskTitle)) {
      return 'Task already exists.';
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
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="inputTodoTitle"></label>
            <div>
              <input name="todoTitle"
                      type="text"
                      autoComplete="off"
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
              <input name="todoResponsible"
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
            {this.renderError()}
          </div>
        </form>
      </div>
    )
  }
}