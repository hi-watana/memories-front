import React from 'react';
import {
  Button,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons'
//import './App.css';

const dark_theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      dark: '#5a94af',
      main: '#81d4fa',
      light: '#9adcfb',
    },
    secondary: {
      dark: '#aa647b',
      main: '#f48fb1',
      light: '#f6atc0',
    }
  },
});

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      date: props.value.date,
      content: props.value.content,
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
        {this.state.date} {this.state.content}
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
            <form>
              <Button type="submit" onClick={this.onClick} variant="contained" color="secondary">
                Yes
            </Button>
            </form>
            <Button onClick={this.handleClose}>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </li>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      note_items: [],
      textarea_value: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/words/get_notes?frame_size=50', {
      method: 'GET',
      mode: 'cors',
    }).then(res => res.json())
      .then(res => {
        this.setState({
          note_items: res,
        })
      })
      .catch(console.log);
  }

  addNote(event) {
    fetch('http://localhost:3000/api/words/add_note', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content: this.state.textarea_value})
    });
  }

  deleteNote(_id) {
    fetch('http://localhost:3000/api/words/delete_note?_id=' + _id, {
      method: 'DELETE',
      mode: 'cors',
    });
  }

  handleChange(event) {
    this.setState({
      textarea_value: event.target.value,
    });
  }

  render() {
    return (
      <ThemeProvider theme={dark_theme}>
        <CssBaseline />
      <div style={{margin: '10px'}}>
        <div>
          <ul>
            {
              this.state.note_items.map(note => (
                <ListItem key={note._id} value={note} onClick={() => this.deleteNote(note._id)} />
              ))
            }
          </ul>
        </div>

        <div>
          <form onSubmit={this.addNote}>
              <TextField
                value={this.state.textarea_value}
                onChange={this.handleChange}
                id="standard-textarea"
                label="Content"
                placeholder=""
                multiline
                fullWidth
              />
            <Button type="submit" variant="contained" color="primary">Add</Button>
          </form>
        </div>

        <div>
          <form>
            <Button variant="contained" type="submit" color="secondary">Reload</Button>
          </form>
        </div>
      </div>
      </ThemeProvider>
    );
  }
}

export default App;
