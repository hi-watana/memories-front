import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.onClick = props.onClick;
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  }

  handleClickOpen = () => {
    this.setState({
      isOpen: true,
    });
  }

  render() {
    return (
      <li>
        {this.props.date} {this.props.content}
        <IconButton type="submit" onClick={this.handleClickOpen}>
          <Delete />
        </IconButton>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this note?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={() => { this.onClick(); this.handleClose() }} variant="contained" color="secondary">
              Yes
            </Button>
            <Button onClick={this.handleClose}>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </li>
    );
  }
}
