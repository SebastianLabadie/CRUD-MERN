import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    state={
        users:[],
        username:''
    }

    componentDidMount(){
        this.getUsers()
    }

    getUsers= async () => {
        const res =await axios.get('https://react-simple-notes-app99.herokuapp.com/api/users')
        this.setState({users:res.data})
    }

    handleOnChange=(e)=>{
        this.setState({
            username:e.target.value
        })
    }

    handleSubmit=async (e) =>{
        e.preventDefault();
        const res= await axios.post('https://react-simple-notes-app99.herokuapp.com/api/users', {username:this.state.username})
        
        this.getUsers()
        this.setState({
            username:''
        })
    }

    handleDoubleClick=async(id)=>{
        await axios.delete('https://react-simple-notes-app99.herokuapp.com/api/users/'+id)
        this.getUsers()
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" 
                                className="form-control" 
                                onChange={this.handleOnChange}
                                value={this.state.username}/>
                            </div>
                                <button type="submit" className="btn btn-primary ">Crear</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map((user)=>(
                                <li 
                                className="list-group-item list-group-item-action" 
                                key={user._id}
                                onDoubleClick={() => this.handleDoubleClick(user._id)}
                                >
                                    {user.username}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
