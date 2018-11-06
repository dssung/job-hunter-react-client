import React from "react";
import {hot} from "react-hot-loader";
import JobPanel from './Components/JobPanel';
import JobDetails from './Components/JobDetails';
import ApiClient from './api-client';

import {Card} from '@material-ui/core';
import AddJobModal from './Components/AddJobModal';
import "./style.css";

class MyJobsDashboard extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
				jobs: [],
				currJob: null,
				isLoaded: false,
				error: null,
		}
	}

	getJobs(){
		ApiClient.get('/jobs')
			.then(response => {
				this.setState({
						isLoaded: true,
						jobs: response.data
				});
			})
			.catch(error => {
				this.setState({
					isLoaded: true,
					error
				});
			});
	}

	componentDidMount(){
		this.getJobs();
	}


	handlePanelClick(job){
			this.setState({ currJob: job});
	}

	
	renderPanels(){
			const { error, isLoaded, jobs } = this.state;

			if (error){
				return <div>Error: {error.message}</div>
			
			} else if (!isLoaded){
					return <div>Loading...</div>
			
			} else {
					let allPanels = [];
					
					for (let i = 0 ; i < jobs.length; i++){
						let job = jobs[i];
						
						allPanels.push(
							<JobPanel
								key = {i}
								setCurrJob = {this.handlePanelClick.bind(this)}
								job = {job}/>
						);
					}
					
					return allPanels;
			}
	}
	
	
	render(){
		return (
			<div className = "my-jobs-container">
				<div className = 'job-dashboard'>
					{this.renderPanels()}
						<Card className = "add-job-button">
							<AddJobModal
								update = {this.getJobs.bind(this)}>
							</AddJobModal>
						</Card>					
				</div>
				
				<div className = 'job-details'>
					<JobDetails job = {this.state.currJob}/>
				</div>

			</div>
		);  
	} 
}

export default hot(module)(MyJobsDashboard);