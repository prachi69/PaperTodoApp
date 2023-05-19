import React, { Component } from 'react';
import axios from 'axios';
import './TodoApp.css';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      taskDetails: [],
      filter: 'all',
      output: '',
    };
  }

  usedetails = () => {
    axios
      .get('http://localhost:3001/api/showtasks')
      .then((response) => {
        // console.log(response.data.taskDetails);
        this.setState({ taskDetails: response.data.taskDetails });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.usedetails();
    console.log('componentDidMount Invoked');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.taskDetails !== this.state.taskDetails) {
      this.usedetails();
      console.log('componentDidUpdate Invoked');
    }
  }

  handleInputTaskChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  addTask = (event) => {
    event.preventDefault();
    if (this.state.newTask.trim() !== '') {
      const taskData = {
        taskTxt: this.state.newTask,
      };
      axios
        .post('http://localhost:3001/api/addtask', taskData)
        .then((response) => {
          // console.log(response.data.msg);
          this.setState({ output: response.data.msg, newTask: '' });
          this.usedetails();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  toggleTaskStatus = (_id, status) => {
    // alert (status+"-------->"+_id);
    var apiURL = 'http://localhost:3001/api/managestatus/' + status + '/' + _id;
    axios
      .get(apiURL)
      .then((response) => {
        this.usedetails();
      })
      .catch((error) => {
        console.log(error);
      });
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

                <button id="addbtn" className="addbtn" type="submit">
                  Add
                </button>
              </form>

              {this.state.taskDetails.map((todo) => (
                <div
                  className="AddTask"
                  key={todo._id}
                  style={{
                    textDecoration: todo.status === 1 ? 'line-through' : 'none',
                    backgroundColor: todo.status === 1 ? '#A9A9A9' : 'white',
                  }}
                  onClick={() =>
                    this.toggleTaskStatus(
                      todo._id,
                      todo.status === 0 ? 'completed' : 'pending'
                    )
                  }
                >
                  {todo.taskTxt}
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
