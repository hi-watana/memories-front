import React from 'react';
import {
  List,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Divider,
} from '@mui/material';
import NoteItem from './components/NoteItem';
import TopAppBar from './components/TopAppBar';
import NoteCreator from './components/NoteCreator';
import AddNoteFab from './components/AddNoteFab';
import { StyledEngineProvider } from '@mui/material/styles';

//import './App.css';

const dark_theme = createTheme({
  palette: {
    mode: 'dark',
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

const light_theme = createTheme();

const App = () => {
  const [noteItems, setNoteItems] = React.useState([]);
  const [noteCreatorOpen, setNoteCreatorOpen] = React.useState(false);

  const getNotes = () => {
    fetch(`${process.env.REACT_APP_API_URI}/notes/?frame_size=50`, {
      method: 'GET',
      mode: 'cors',
    }).then(res => res.json())
      .then(res => {
        setNoteItems(res);
      })
      .catch(console.log);
  };

  React.useEffect(() => {
    getNotes();
  }, []);

  const deleteNote = (_id, cont) => {
    fetch(`${process.env.REACT_APP_API_URI}/notes/${_id}`, {
      method: 'DELETE',
      mode: 'cors',
    }).then(response => cont());
  };

  return (
    <StyledEngineProvider injectFirst>
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
                <React.Fragment key={note._id}>
                  {index > 0 && <Divider />}
                  <NoteItem date={note.date} content={note.content} onClick={() => {
                    deleteNote(note._id, getNotes);
                  }} />
                </React.Fragment>
              ))
            }
          </List>
          <AddNoteFab setNoteCreatorOpen={setNoteCreatorOpen} noteCreatorOpen={noteCreatorOpen} />
          <NoteCreator
            getNotes={getNotes}
            onClose={() => setNoteCreatorOpen(false)}
            open={noteCreatorOpen}
          />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
