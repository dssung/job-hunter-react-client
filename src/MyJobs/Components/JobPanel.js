import React from 'react';
import {hot} from 'react-hot-loader';
import moment from 'moment';
import {Card, CardContent, CardActions, Chip} from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/CalendarToday';

class JobPanel extends React.Component{
	constructor(props){
		super(props);
	}

	onClick(){
		this.props.onClick(this.props.job)
	}

	formatDate(date){
		return moment(date).format('DD MMM');
	}

	render(){
		let {company, location, position, created_date} = this.props.job;
		
		return (
			<Card onClick = {this.onClick.bind(this)}>
				<CardContent>
					<h4>{company}</h4>
					<p>{position}</p>
					<p>{location}</p>
				</CardContent>

				<CardActions>
					<Chip
						label = {this.formatDate(created_date)}
						icon = {<CalendarIcon/>}
					/>
				</CardActions>
			</Card>
		);  
	}
}

export default hot(module)(JobPanel);