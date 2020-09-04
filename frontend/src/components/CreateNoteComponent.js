import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    editing: false,
    editing_id: "",
  };

  async componentDidMount() {
    this.getNotes();
    if (this.props.match.params.id) {
      const res = await axios.get(
        "https://react-simple-notes-app99.herokuapp.com/api/notes/" +
          this.props.match.params.id
      );

      this.setState({
        editing: true,
        editing_id: this.props.match.params.id,
        title: res.data.title,
        content: res.data.content,
        userSelected: res.data.author,
        date: new Date(res.data.date),
      });
    }
  }

  getNotes = async () => {
    const res = await axios.get(
      "https://react-simple-notes-app99.herokuapp.com/api/users"
    );

    if(res.data.length > 0){
        this.setState({
          users: res.data.map((user) => user.username),
          userSelected: res.data[0].username,
        });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeDate = (date) => {
    this.setState({ date });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected,
    };

    if (this.state.editing === true) {
      await axios.put(
        "https://react-simple-notes-app99.herokuapp.com/api/notes/" +
          this.state.editing_id,
        newNote
      );
    } else {
      await axios.post(
        "https://react-simple-notes-app99.herokuapp.com/api/notes",
        newNote
      );
    }
    window.location.href = "/CRUD-MERN/";
  };
  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a Note</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <select
                className="form-control"
                name="userSelected"
                onChange={this.handleChange}
                value={this.state.userSelected}
              >
                {this.state.users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                required
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                name="content"
                placeholder="Content"
                required
                className="form-control"
                value={this.state.content}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={this.state.date}
                value={this.state.date}
                onChange={this.handleChangeDate}
              />
            </div>

            <button type="submit" className="btn btn-danger">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
