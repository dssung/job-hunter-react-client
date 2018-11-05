import React from "react";
import {hot} from "react-hot-loader";

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
            </div>
        );  
    }
}

export default hot(module)(JobDetails);