import React from "react";
import {hot} from "react-hot-loader";
import moment from "moment";
import {Card, CardContent, CardActions, Chip} from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/CalendarToday';


class JobPanel extends React.Component{
    constructor(props){
      super(props);
    	this.handlePanelClick = this.handlePanelClick.bind(this);
    }

    handlePanelClick(){
      	this.props.setCurrJob(this.props.job)
    }

    formatDate(date){
        var day = moment(date);
        return day.format('DD MMM');
    }

    render(){
        let {company, location, position, created_date} = this.props.job;
				
				return (
					<Card onClick = {this.handlePanelClick}>
						<CardContent>
							<h4>{company}</h4>
							<p>{position}</p>
							<p>{location}</p>
						</CardContent>

						<CardActions>
							<Chip 
								label = {this.formatDate(created_date)}
								icon = {<CalendarIcon/>}/>
						</CardActions>
					</Card>
        );  
    }
}

export default hot(module)(JobPanel);