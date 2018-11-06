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

class EditJobDetails extends React.Component{
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
			});
			
			this.props.close();
	}

	handleCancelClick(){
		this.props.close();
	}

	render(){
			if (this.props.job == null)
					return <h2>Select job</h2>

			let job = this.state.job;
			
			return (
				<div className = 'modal-container'>
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
							className = 'add-job-field'
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

						<Button 
							variant = 'contained' 
							color = 'primary'
							onClick = {this.handleSaveClick.bind(this)}>
							Save
						</Button>

						<Button 
							variant = 'contained' 
							color = 'secondary'
							onClick = {this.handleCancelClick.bind(this)}>
							Cancel
						</Button>
				</div>
		);  
	}
}

export default hot(module)(EditJobDetails);