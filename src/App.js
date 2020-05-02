import React from 'react';
import {
  Button,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  TextField,
} from '@material-ui/core';
import ListItem from './components/ListItem'

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


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      note_items: [],
      textarea_value: '',
    }
  }

  getNotes = () => {
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

  componentDidMount() {
    this.getNotes()
  }

  addNote = (cont) => {
    fetch('http://localhost:3000/api/words/add_note', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content: this.state.textarea_value})
    }).then(response => cont());
  }

  clearTextareaValue = () => {
    this.setState({
      textarea_value: ''
    })
  }

  deleteNote = (_id, cont) => {
    fetch('http://localhost:3000/api/words/delete_note?_id=' + _id, {
      method: 'DELETE',
      mode: 'cors',
    }).then(response => cont());
  }

  handleChange = (event) => {
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
                <ListItem key={note._id} date={note.date} content={note.content} onClick={() => {
                  this.deleteNote(note._id, this.getNotes)
                }} />
              ))
            }
          </ul>
        </div>

        <div>
            <TextField
              value={this.state.textarea_value}
              onChange={this.handleChange}
              id="standard-textarea"
              label="Content"
              placeholder=""
              multiline
              fullWidth
            />
          <Button onClick={() => {
            this.addNote(() => {
              this.getNotes()
              this.clearTextareaValue()
            })
          }} variant="contained" color="primary">Add</Button>
        </div>

        <div>
          <Button variant="contained" onClick={() => this.getNotes()} color="secondary">Reload</Button>
        </div>
      </div>
      </ThemeProvider>
    );
  }
}

export default App;
