import React from 'react';
import {hot} from 'react-hot-loader';
import {Card} from '@material-ui/core';
//Components
import JobTile from './Components/JobTile';
import JobDetail from './Components/JobDetail';
import AddJobModal from './Components/AddJobModal';

import ApiClient from './api-client';
import './style.scss';

class MyJobsDashboard extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
				jobs: [],
				detailKey: null,
				isLoaded: false,
				error: null,
		}
	}

	componentDidMount(){
		this.getJobs();
	}

	//GET request for all jobs, set to state
	getJobs(){
		ApiClient.get('/jobs')
			.then(response => {
				this.setState({
						isLoaded: true,
						jobs: response.data,
				});
			})
			.catch(error => {
				this.setState({
					isLoaded: true,
					error
				});
			});
	}

	handlePanelClick(i){
			this.setState({ 
				detailKey: i,
			});
	}

	//Renders all job panels
	renderPanels(){
			const {error, isLoaded, jobs} = this.state;

			if (error){
				return <div>Error: {error.message}</div>

			} else if (!isLoaded){
					return <div>Loading...</div>
			
			} else {
				
					let allPanels = [];
					
					for (let i in jobs){
						let job = jobs[i];

						allPanels.push(
							<JobTile
								className = {(this.state.detailKey === i) ? 'selected-tile' : ''}
								key = {i}
								onClick = {this.handlePanelClick.bind(this, i)}
								job = {job}
							/>
						);
					}
					return allPanels;
			}
	}
	
	render(){
		return (
			<div className = 'my-jobs-container'>
				<div className = 'job-dashboard-container'>
					{this.renderPanels()}
					
					<Card className = 'add-job-button'>
						<AddJobModal updateJobs = {this.getJobs.bind(this)}/>
					</Card>					
				</div>
				
				<div className = 'job-detail-container'>
					<JobDetail
						job = {this.state.jobs[this.state.detailKey]}
						updateJobs = {this.getJobs.bind(this)}
					/>
				</div>
			</div>
		);  
	} 
}

export default hot(module)(MyJobsDashboard);