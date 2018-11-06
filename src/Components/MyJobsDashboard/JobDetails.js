import React from "react";
import {hot} from "react-hot-loader";
import {Select, MenuItem} from '@material-ui/core';


class JobDetails extends React.Component{

    render(){
        if (this.props.job == null){
            return <h2>Select job</h2>
        }
        
        return (
            <div>
                <h3><b>{this.props.job.company}</b></h3>
                <h5>{this.props.job.position}</h5>
                <h5>{this.props.job.location}</h5>		
                <Select
                    value = {this.props.job.status}
                >
                    <MenuItem value={'INTERESTED'}>Interested</MenuItem>
                    <MenuItem value={'APPLIED'}>Applied</MenuItem>
                    <MenuItem value={'IN PROGRESS'}>In Progress</MenuItem>
                    <MenuItem value={'REJECTED'}>Rejected</MenuItem>
                </Select>	
            </div>
        );  
    }
}

export default hot(module)(JobDetails);