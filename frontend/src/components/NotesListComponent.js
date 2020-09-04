import React, { Component } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
export default class NotesList extends Component {
    state={
        notes:[]
    }
    componentDidMount(){
        this.getNotes()
    }
    getNotes= async () => {
        const res =await axios.get('http://localhost:4000/api/notes')
        this.setState({notes:res.data})
    }
    handleClick=async(id,c)=>{
        console.log(id+'   '+c)
        const res= await axios.delete('http://localhost:4000/api/notes/'+id)
        console.log(res)
        this.getNotes()
    }
    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map((note)=>(
                       
                        <div className="col-md-4 p-2" key={note._id}>
                            { console.log(note)} 
                            <div className="card">
                                <div className="card-header">
                                    <h5>{note.title}</h5>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p>{note.author}</p>
                                    <p>{format(note.author)}</p>
                                </div>
                                <div className="card-body">
                                    <button className="btn btn-danger" onClick={()=>this.handleClick(note._id,note.content)}>
                                        Delete      
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
