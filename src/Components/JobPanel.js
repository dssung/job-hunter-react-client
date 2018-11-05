import React from "react";
import {hot} from "react-hot-loader";
import moment from "moment";
import {Panel, Label, Glyphicon} from "react-bootstrap";

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
        let {company, location, position} = this.props.job;
				
				return (
					<Panel onClick = {this.handlePanelClick}>
						<Panel.Body>
							<h5><b>{company} - {location}</b></h5>
							<h5>{position}</h5>

							<Label>
								<Glyphicon glyph = "calendar"/> 
								{' '}
								{this.formatDate(this.props.date)}
							</Label>
						</Panel.Body>
						
						<Panel.Footer>
							{this.props.status}
						</Panel.Footer>
					</Panel>
        );  
    }
}

export default hot(module)(JobPanel);