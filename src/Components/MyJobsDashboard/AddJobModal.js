import React from 'react';
import {Modal, Button, Paper} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {hot} from "react-hot-loader";

class AddJobModal extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      open: false,
    }
  }

  handleOpen(){
    this.setState({open: true});
  };


  handleClose(){
    this.setState({open: false});
  }


  render(){
    return (
      <div>
        <Button 
          mini variant="fab" 
          color="primary" 
          aria-label="Add"
          onClick = {this.handleOpen.bind(this)}
        >
          <AddIcon/>
        </Button>
        
        <Modal
          open = {this.state.open}
          onClose = {this.handleClose.bind(this)}
        >

          <Paper>
            <h1> MODAL BIETCH</h1>
          
          </Paper>
        
        </Modal>

      </div>
    );
  }
}

export default hot(module)(AddJobModal);