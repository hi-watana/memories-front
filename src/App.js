import React from 'react';
import {
  makeStyles,
  Button,
  Fab,
  List,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  TextField,
  Divider,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import NoteItem from './components/NoteItem'
import TopAppBar from './components/TopAppBar'
import 'typeface-roboto'

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

const light_theme = createMuiTheme()

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const App = () => {
  const [noteItems, setNoteItems] = React.useState([])
  const [textAreaValue, setTextAreaValue] = React.useState('')

  const getNotes = () => {
    fetch('http://localhost:3030/api/words/get_notes?frame_size=50', {
      method: 'GET',
      mode: 'cors',
    }).then(res => res.json())
      .then(res => {
        setNoteItems(res)
      })
      .catch(console.log);
  }

  React.useEffect(() => {
    getNotes()
  }, [])

  const addNote = (cont) => {
    fetch('http://localhost:3030/api/words/add_note', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: textAreaValue })
    }).then(response => cont());
  }

  const clearTextareaValue = () => {
    setTextAreaValue('')
  }

  const deleteNote = (_id, cont) => {
    fetch('http://localhost:3030/api/words/delete_note?_id=' + _id, {
      method: 'DELETE',
      mode: 'cors',
    }).then(response => cont());
  }

  const handleChange = (event) => {
    setTextAreaValue(event.target.value)
  }

  return (
    <ThemeProvider theme={
      window.matchMedia("(prefers-color-scheme: dark)").matches ? dark_theme : light_theme
    }
    >
      <CssBaseline />
      <TopAppBar />
      <div style={{ margin: '10px' }}>
        <List>
          {
            noteItems.map((note, index) => (
              <React.Fragment>
                {index > 0 && <Divider />}
                <NoteItem key={note._id} date={note.date} content={note.content} onClick={() => {
                  deleteNote(note._id, getNotes)
                }} />
              </React.Fragment>
            ))
          }
        </List>

        <TextField
          value={textAreaValue}
          onChange={handleChange}
          id="standard-textarea"
          label="Content"
          placeholder=""
          multiline
          fullWidth
        />
        <Button onClick={() => {
          addNote(() => {
            getNotes()
            clearTextareaValue()
          })
        }} variant="contained" color="primary">Add</Button>
        <Button variant="contained" onClick={() => getNotes()} color="secondary">Reload</Button>
        <Fab aria-label={'Add'} color={'primary'} button>
          <AddIcon />
        </Fab>
      </div>
    </ThemeProvider>
  );
}

export default App;