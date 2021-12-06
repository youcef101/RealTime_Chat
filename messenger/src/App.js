import React, { useContext } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
//import axiosInstance from './axios';
//import { decryptData } from './utils';
import { AuthContext } from './context/AuthContext';



function App() {
  const { user } = useContext(AuthContext)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Register />}
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>

        </Switch>
      </Router>
    </div >
  );
}

export default App;
