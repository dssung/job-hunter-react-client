import React from "react";
import {hot} from "react-hot-loader";
import JobPanel from './JobPanel';
import JobDetails from './JobDetails';
import ApiClient from '../../api-client';

class MyJobsDashboard extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
				jobs: [],
				currJob: null,
				isLoaded: false,
				error: null
		}
	}

	componentDidMount(){
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


	handlePanelClick(job){
			this.setState({
					currJob: job
			});
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
				</div>
				
				<div className = 'job-details'>
					<JobDetails
								job = {this.state.currJob}/>
				</div>
			</div>
		);  
	} 
}

export default hot(module)(MyJobsDashboard);