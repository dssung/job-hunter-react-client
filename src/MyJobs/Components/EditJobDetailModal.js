import React from 'react';
import {hot} from 'react-hot-loader';
import {MenuItem, Button, TextField} from '@material-ui/core';
import ApiClient from '../api-client';

const status = [
  {
    value: 'INTERESTED',
    label: 'Interested',
  },
  {
    value: 'APPLIED',
    label: 'Applied',
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
  },
  {
    value: 'REJECTED',
    label: 'Rejected',
  },
];

class EditJobDetailModal extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {
			job: {...this.props.job},
		}
	}
	
	handleChange(name){
    let newValue = event.target.value;

    if (name === 'status')
      newValue = event.target.dataset.value;

    let updateJob = this.state.job;
    updateJob[name] = newValue;
    
    this.setState({
      job: updateJob
		});
	}
	
	handleSaveClick(){
		ApiClient.put(`/jobs/${this.state.job._id}`, this.state.job)
			.then(response => {
				this.props.updateJobs();
			}).catch(error => {
				console.log(error);
			}).then(() => {
				this.props.close(false);
			});
	}

	handleDeleteClick(){
		ApiClient.delete(`/jobs/${this.state.job._id}`)
			.then(response => {
				this.props.updateJobs();
			}).catch(error => {
				console.log(error);
			}).then(()=>{
				this.props.close(true);
			});
	}

	handleCancelClick(){
		this.props.close(false)
	}

	render(){
			if (this.props.job == null)
					return <h2>Select job</h2>

			let job = this.state.job;
			
			return (
				<div className = 'editable-job-container'>
						<div className = 'editable-job-body'>
							<h3> Update Job </h3>

							<TextField
								label = 'Company'
								value = {job.company}
								onChange = {this.handleChange.bind(this, 'company')}
								margin = 'normal'
							/>

							<TextField
								label = 'Position'
								value = {job.position}
								onChange = {this.handleChange.bind(this, 'position')}
								margin = 'normal'
							/>

							<TextField
								label = 'location'
								value = {job.location}
								onChange = {this.handleChange.bind(this, 'location')}
								margin = 'normal'
							/>

							<TextField
								select
								label = 'Status'
								value = {job.status}
								onChange = {this.handleChange.bind(this, 'status')}
								margin = 'normal'
							>
								{status.map(option => (
									<MenuItem 
										key = {option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<div className = 'editable-job-actions'>
								<Button
									className = 'editable-job-button'
									variant = 'contained' 
									color = 'primary'
									onClick = {this.handleSaveClick.bind(this)}>
									Save
								</Button>

								<Button
									className = 'editable-job-button' 
									variant = 'contained' 
									color = 'secondary'
									onClick = {this.handleDeleteClick.bind(this)}>
									Delete
								</Button>

								<Button 
									className = 'editable-job-button'
									variant = 'outlined' 
									color = 'secondary'
									onClick = {this.handleCancelClick.bind(this)}>
									Cancel
								</Button>
							</div>
						</div>	
				</div>
		);  
	}
}

export default hot(module)(EditJobDetailModal);