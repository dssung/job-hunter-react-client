import React from "react";
import {hot} from "react-hot-loader";
import {Grid, Row, Col} from "react-bootstrap";
import JobPanel from './JobPanel';
import JobDetails from './JobDetails';
import ApiClient from '../api-client';

class MyJobsDashBoard extends React.Component{
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
								<Col xs={6} md={4} key = {i}>
										<JobPanel
												index = {i}
												setCurrJob = {this.handlePanelClick.bind(this)}
												job = {job}/>
								</Col>
						);
					}
					
					return allPanels;
			}
	}
	

	render(){
		return (
			<Grid>
				<Row>
					<Col md={8}>
						<Row className="show-grid">
								{this.renderPanels()}
						</Row>
					</Col>
					
					<Col md = {4}>
						<JobDetails
							job = {this.state.currJob}/>
					</Col>
				</Row>
			</Grid>
		);  
	} 
}

export default hot(module)(MyJobsDashBoard);