import React from "react";
import {hot} from "react-hot-loader";
import MyJobsDashboard from '../MyJobs/index.js'

class AppPage extends React.Component{
	constructor(props) {
		super(props);
	}
	
	render(){
		return (
			<MyJobsDashboard></MyJobsDashboard>
		);  
	} 
}

export default hot(module)(AppPage);