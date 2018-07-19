import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Home from "./components/Home/Home";
import Cont from "./components/Cont/Cont";
import AboutMe from "./components/AboutMe/AboutMe";
import RightBar from "./components/RightBar/RightBar";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
              <Route exact path='/' render={() => <Home />}/>
              {/*<Route exact path='/home' render={() => <Home />}/>*/}
              <Route exact path='/cont' render={() => <Cont/>}/>
              <Route exact path='/about' render={() => <AboutMe/>}/>
          </Switch>

          <RightBar/>
      </div>
    );
  }
}

export default App;
