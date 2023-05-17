import React, { Component } from 'react';
import './TodoApp.css';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: ''
    };
  }

  handleInputTaskChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  addTask = (event) => {
    event.preventDefault();
    // const { newTask } = this.state;

    if (this.state.newTask.trim() !== '') {

      const newId = this.state.tasks.length + 1;

      const newTask = { 
      id: newId,
      text: this.state.newTask,
      completed: false
      };

      const tasks = [...this.state.tasks, newTask];
    
      this.setState({ tasks, newTask: '' });
    }
  };

  render() {
    const { newTask, filter } = this.state;

    return (
      <div>
        <body className="bodyDesign">
          <section className="sectionDesign">
            <div id="box" className="lined thick">
              <h1 className="paperTodo-heading">Todo List</h1>

              <form onSubmit={this.addTask}>
                <input
                  id="addfield"
                  className="inputFeild"
                  type="text"
                  value={newTask}
                  onChange={this.handleInputTaskChange}
                  placeholder="New todo"
                />

                <button id="addbtn" className="addbtn" type="submit"> Add </button>
              </form>
              {
                this.state.tasks.map( (todo) => (
                    <div className="AddTask">{todo.text}</div>
                ))
              }
            </div>
          </section>
        </body>
      </div>
    );
  }
}

export default TodoApp;