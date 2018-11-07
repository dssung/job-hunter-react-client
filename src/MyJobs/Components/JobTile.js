import React from 'react';
import {hot} from 'react-hot-loader';
import moment from 'moment';
import {Card, CardContent, CardActions, Chip} from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/CalendarToday';

import JobDetailModal from './JobDetailModal';

class JobTile extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			job: this.props.job,
			key: this.props.key,
			open: false
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			job: nextProps.job,
			key: nextProps.key
		});
	}

	handleClick(){
		this.setState({ open: true });
	}

	handleClose(){
		this.setState({ open: false });
	}

	formatDate(date){
		return moment(date).format('DD MMM');
	}

	render(){
		let {company, location, position, created_date, status} = this.state.job;
		
		return (
			<>
				<Card 
					onClick = {this.handleClick.bind(this)}
				>
					<CardContent>
						<h4>{company}</h4>
						<p>{position}</p>
						<p>{location}</p>
						<p>{status}</p>
					</CardContent>

					<CardActions>
						<Chip
							label = {this.formatDate(created_date)}
							icon = {<CalendarIcon/>}
						/>
					</CardActions>
				</Card>

				<JobDetailModal
					open = {this.state.open}
					handleClose = {this.handleClose.bind(this)}
					job = {this.state.job}
					updateJobs = {this.props.updateJobs}
				/>
			</>
		);  
	}
}

export default hot(module)(JobTile);