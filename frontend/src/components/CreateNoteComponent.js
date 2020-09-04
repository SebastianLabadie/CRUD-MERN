import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {
    state={
        users:[],
        userSelected:'',
        title:'',
        content:'',
        date:new Date()
    }
    componentDidMount(){
        this.getNotes()
    }
    getNotes=async()=>{
        const res=await axios.get('http://localhost:4000/api/users')
        this.setState({
            users:res.data.map((user) => user.username),
            userSelected:res.data[0].username
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleChangeDate=(date)=>{
        this.setState({
            date:date
        })
    }

    handleSubmit=async (e)=>{
            e.preventDefault();
            const newNote={
                title:this.state.title,
                content:this.state.content,
                date:this.state.date,
                author:this.state.userSelected
            }
            await axios.post('http://localhost:4000/api/notes',newNote)
            window.location.href='/'
    }
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                        <h4>Create a Note</h4>
                        <div className="form-group">
                            <select 
                                className="form-control"
                                name="userSelected"
                                onChange={this.handleChange}
                                defaultValue={this.state.userSelected}
                            >
                                {
                                    this.state.users.map((user)=>
                                    <option key={user} value={user}>
                                        {user}
                                    </option>)
                                }
                            </select>
                        </div>

                                
                        <div className="form-group">
                            <input type="text" 
                            className="form-control" 
                            placeholder="Title"
                            name="title" 
                            required
                            onChange={this.handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <textarea name="content" 
                            placeholder="Content" 
                            required 
                            className="form-control"
                            onChange={this.handleChange} ></textarea>
                        </div> 
                        <div className="form-group">
                            <DatePicker 
                            className="form-control"
                            selected={this.state.date}
                            />
                        </div>

                        <form onSubmit={this.handleSubmit}>
                                <button type="submit" className="btn btn-danger">
                                    Save 
                                </button>
                        </form>

                </div>
                
            </div>
        )
    }
}
