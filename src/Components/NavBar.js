import React from "react";
import {hot} from "react-hot-loader";
import {AppBar, Tabs, Tab} from '@material-ui/core';

class NavBar extends React.Component{

  render(){
    return (
    <AppBar position="static">
      <Tabs fullWidth>
        <Tab label='My Jobs'/>
      </Tabs>
    </AppBar>
    );
  }
}

export default hot(module)(NavBar);