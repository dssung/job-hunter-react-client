import React from 'react';
import {hot} from 'react-hot-loader';
import {Modal, Paper, Select, MenuItem, Button, Icon} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';

import EditJobDetailModal from './EditJobDetailModal';
import ApiClient from '../api-client';

class JobDetailModal extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {
			editable: false,
		}
	}

	handleCloseClick(){
    this.props.handleClose();
	}

	handleEditClick(){
		this.setState({
			editable: true
		})
	}

	closeEditable(isDeleted){
		this.setState({
			editable: false
		});
		
		if (isDeleted){
			this.handleCloseClick();
		}	
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

	renderModal(){
		let job = this.props.job;

		if (job == null)
			return <h2>Select job</h2>

		if (this.state.editable === false){
			return(
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

					<Button 
						mini 
						variant = 'fab' 
						color = 'secondary' 
						aria-label = 'Close'
						className = 'close-button'
						onClick = {this.handleCloseClick.bind(this)}>
							<Icon><ClearIcon/></Icon>
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
				<EditJobDetailModal
					job = {job}
					close = {this.closeEditable.bind(this)}
					updateJobs = {this.props.updateJobs}
				/>
			);
		}
	}

	render(){		
		return (
			<Modal 
				open = {this.props.open}
			>
				<Paper>
					{this.renderModal()}
				</Paper>
			</Modal>
		);  
	}
}

export default hot(module)(JobDetailModal);