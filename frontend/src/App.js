import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import Navigation from './components/NavigationComponent'
import CreateNote from './components/CreateNoteComponent'
import CreateUser from './components/CreateUserComponent'
import NotesList from './components/NotesListComponent'

function App() {
  return (
    <Router>

      <Navigation />

      <div className="container p-4">
        <Switch>
          <Route exact path='/' component={NotesList}/>
          <Route exact path='/edit/:id' component={CreateNote}/>
          <Route exact path='/create' component={CreateNote}/>
          <Route exact path='/user' component={CreateUser}/>
          <Route exact path='/CRUD-MERN/' component={NotesList}/>
        </Switch>
      </div>
      
    </Router>
  );
}

export default App;
