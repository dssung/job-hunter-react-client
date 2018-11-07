import React from 'react';
import {hot} from 'react-hot-loader';
import {Card} from '@material-ui/core';
import ApiClient from './api-client';
import './style.scss';

import JobTile from './Components/JobTile';
import AddJobModal from './Components/AddJobModal';

class MyJobsDashboard extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
				jobs: [],
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

	//Renders all job panels
	renderTiles(){
		const { error, isLoaded, jobs } = this.state;

		if (error){
			return <div>Error: {error.message}</div>

		} else if (!isLoaded){
			return <div>Loading...</div>
		
		} else {
			let tiles= [];
			
			for (let i in jobs){
				let job = jobs[i];

				tiles.push(
					<JobTile
						key = {i}
						job = {job}
						updateJobs = {this.getJobs.bind(this)}
					/>
				);
			}
			return tiles;
		}
	}
	
	render(){
		return (
			<div className = 'my-jobs-container'>

					{this.renderTiles()}
					
					<Card className = 'add-job-button'>
						<AddJobModal updateJobs = {this.getJobs.bind(this)}/>
					</Card>					
			</div>
		);  
	} 
}

export default hot(module)(MyJobsDashboard);