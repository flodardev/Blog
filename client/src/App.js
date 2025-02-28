import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>React is working!</h1>
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path="/home" component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
