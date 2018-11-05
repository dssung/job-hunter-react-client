import React, {Component} from "react";
import {hot} from "react-hot-loader";
import "./style.css";

//Components
import MyJobsDashboard from './Components/MyJobsDashboard/MyJobsDashboard'
import NavBar from './Components/NavBar'

class App extends Component{
  render(){
    return(
      <div className = 'App'>
        <div className = 'nav-bar'>
          <NavBar/>
        </div>

        <div className = 'app-page'>
          <MyJobsDashboard/>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);