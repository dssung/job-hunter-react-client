import React, {Component} from "react";
import {hot} from "react-hot-loader";
import "./style.scss";


//Components
import MyJobsDashboard from './Components/MyJobsDashboard'

class App extends Component{
  render(){
    return(
      <div className = 'App'>
        <MyJobsDashboard/>
      </div>
    );
  }
}

export default hot(module)(App);