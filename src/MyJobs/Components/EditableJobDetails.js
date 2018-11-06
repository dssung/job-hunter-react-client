import React from "react";
import {hot} from "react-hot-loader";
import {Select, MenuItem, Button, Icon, Paper} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'


class JobDetails extends React.Component{

    render(){
        if (this.props.job == null){
            return <h2>Select job</h2>
        }
        
        return (
            <div>
							<Paper className = 'job-detail-paper'>
								<h3><b>{this.props.job.company}</b></h3>
								<h5>{this.props.job.position}</h5>
								<h5>{this.props.job.location}</h5>	

								<Button 
									mini 
									variant="fab" 
									color="secondary" 
									aria-label="Edit">
										<Icon><EditIcon/></Icon>
								</Button>

								<Select
										value = {this.props.job.status}
								>
										<MenuItem value={'INTERESTED'}>Interested</MenuItem>
										<MenuItem value={'APPLIED'}>Applied</MenuItem>
										<MenuItem value={'IN PROGRESS'}>In Progress</MenuItem>
										<MenuItem value={'REJECTED'}>Rejected</MenuItem>
								</Select>	
							</Paper>
            </div>
        );  
    }
}

export default hot(module)(JobDetails);