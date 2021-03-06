import React from 'react';
import {Modal, Button, Paper, TextField, MenuItem} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {hot} from 'react-hot-loader';
import ApiClient from '../api-client';

const status = [
  {
    value: 'INTERESTED',
    label: 'Interested',
  },
  {
    value: 'APPLIED',
    label: 'Applied',
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
  },
  {
    value: 'REJECTED',
    label: 'Rejected',
  },
];

class AddJobModal extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      open: false,
      job: {
        company: '',
        position: '',
        location: '',
        status: 'INTERESTED'
      }
    }
  }

  handleOpenClick(){
    this.setState({ open: true });
  };

  //Set state.job to empty
  handleClose(){
    this.setState({
      job: {
        company: '',
        position: '',
        location: '',
        status: 'INTERESTED'
      },
      open: false
    });
  }

  //POST then update jobs
  handleAddClick(){
    ApiClient.post('/jobs', this.state.job)
      .then((response) => {
        this.handleClose();
        this.props.updateJobs();
      })
      .catch (error => {
        console.log(error);
      });
  }

  handleChange(name){
    let newValue = event.target.value;

    if (name === 'status')
      newValue = event.target.dataset.value;

    let updateJob = this.state.job;
    updateJob[name] = newValue;
    
    this.setState({
      job: updateJob
    });
  }

  render(){
    let job = this.state.job;
    return (
      <>
        <Button 
          mini variant='fab' 
          color='primary' 
          aria-label='Add'
          onClick = {this.handleOpenClick.bind(this)}
        >
          <AddIcon/>
        </Button>
        
        {/*Modal is hidden until button is click*/}
        <Modal
          open = {this.state.open}
          onClose = {this.handleClose.bind(this)}
        >
          <Paper className = 'modal-container'>
            <h2>
              Add New Job
            </h2>

            <TextField
              label = 'Company'
              value = {job.company}
              onChange = {this.handleChange.bind(this, 'company')}
              margin = 'normal'
            />

            <TextField
              label = 'Position'
              value = {job.position}
              onChange = {this.handleChange.bind(this, 'position')}
              margin = 'normal'
            />

            <TextField
              label = 'Location'
              value = {job.location}
              onChange = {this.handleChange.bind(this, 'location')}
              margin = 'normal'
            />

            <TextField
              select
              label='Status'
              value={job.status}
              onChange={this.handleChange.bind(this, 'status')}
              margin='normal'
            >
              {status.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Button 
              variant='contained' 
              color='primary'
              onClick = {this.handleAddClick.bind(this)}>
              Add Job
            </Button>

            <Button 
              variant='contained' 
              color='secondary'
              onClick = {this.handleClose.bind(this)}>
              Cancel
            </Button>
          </Paper>
        </Modal>
      </>
    );
  }
}

export default hot(module)(AddJobModal);