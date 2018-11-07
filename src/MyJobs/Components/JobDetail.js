import React from 'react';
import {hot} from 'react-hot-loader';
import {Select, MenuItem, Button, Icon} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import EditableJobDetails from './EditableJobDetails';
import ApiClient from '../api-client';

class JobDetails extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {
			editable: false
		}
	}

	closeEditable(){
		this.setState({
			editable: false
		});
	}

	handleEditClick(){
		this.setState({
			editable: true
		})
	}

	handleSelectChange(event){
		let updateJob = {...this.props.job};
		updateJob['status'] = event.target.value;

		ApiClient.put(`/jobs/${this.props.job._id}`, updateJob)
			.then(response => {
				this.props.updateJobs();
			}).catch(error => {
				console.log(error);
			});
	}

	render(){
		let job = this.props.job;
		
		if (job == null)
			return <h2>Select job</h2>

		if (this.state.editable === false){
			return (
				<div className = 'job-detail'>
					<div className = 'job-detail-header'>
						<h3><b>{job.company}</b></h3>

						<Button 
							mini 
							variant = 'fab' 
							color = 'secondary' 
							aria-label = 'Edit'
							className = 'edit-button'
							onClick = {this.handleEditClick.bind(this)}>
								<Icon><EditIcon/></Icon>
						</Button>
					</div>

					<div className = 'job-detail-body'>
						<h5>
								{job.position}
								<br/>
								{job.location}
						</h5>
					</div>

					<br/>

					<Select 
						className = 'status-select'
						value = {job.status} 
						onChange = {this.handleSelectChange.bind(this)}
					>
							<MenuItem value = {'INTERESTED'}>Interested</MenuItem>
							<MenuItem value = {'APPLIED'}>Applied</MenuItem>
							<MenuItem value = {'IN_PROGRESS'}>In Progress</MenuItem>
							<MenuItem value = {'REJECTED'}>Rejected</MenuItem>
					</Select>	
				</div>
			);  
		} else {
			return (
				<EditableJobDetails
					job = {job}
					close = {this.closeEditable.bind(this)}
					updateJobs = {this.props.updateJobs}
				/>
			);
		}
	}
}

export default hot(module)(JobDetails);