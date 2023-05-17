import React, { Component } from 'react';
import './TodoApp.css';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
      filter: 'all',
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
        completed: false,
      };

      const tasks = [...this.state.tasks, newTask];

      this.setState({ tasks, newTask: '' });
    }
  };
  toggleTaskStatus = (id) => {
    const tasks = this.state.tasks.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    this.setState({ tasks });
  };

  getFilteredtasks = () => {
    const { tasks, filter } = this.state;
    switch (filter) {
      case 'completed':
        return tasks.filter((todo) => todo.done);
      case 'active':
        return tasks.filter((todo) => !todo.done);
      default:
        return tasks;
    }
  };

  render() {
    const { newTask, filter } = this.state;
    const filteredtasks = this.getFilteredtasks();

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

                <button id="addbtn" className="addbtn" type="submit">
                  Add
                </button>
              </form>

              {filteredtasks.map((todo) => (
                <div
                  className="AddTask"
                  key={todo.id}
                  style={{
                    textDecoration: todo.done ? 'line-through' : 'none',
                  }}
                  onClick={() => this.toggleTaskStatus(todo.id)}
                >
                  {todo.text}
                </div>
              ))}
            </div>
          </section>
        </body>
      </div>
    );
  }
}

export default TodoApp;
