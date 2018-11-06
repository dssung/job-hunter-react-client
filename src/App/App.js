import React, {Component} from "react";
import {hot} from "react-hot-loader";
import "./style.css";

//Components
import AppPage from './AppPage'
import NavBar from './NavBar';

class App extends Component{
  render(){
    return(
      <div className = 'App'>
        <NavBar className = 'nav-bar' />
        <AppPage className = 'app-page'/>
      </div>
    );
  }
}

export default hot(module)(App);