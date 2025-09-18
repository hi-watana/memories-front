import React from 'react';
import {
  Button,
  Divider,
  Paper,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyledEngineProvider } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  contents: {
    margin: theme.spacing(1),
  },
  bottomSheet: {
    position: 'fixed',
    bottom: theme.spacing(0),
    height: theme.spacing(46),
    //top: theme.spacing(0),
    left: theme.spacing(0),
    right: theme.spacing(0),
  },
  buttons: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(1),
  },
}));

const NoteCreator = (props) => {
  const classes = useStyles();
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const buttonProcessing = React.useRef(false);

  const handleChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const clearTextareaValue = () => {
    setTextAreaValue('');
  };

  const addNote = (cont) => {
    fetch(`${process.env.REACT_APP_API_URI}/notes`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: textAreaValue }),
    }).then((response) => cont());
  };

  return (
    <StyledEngineProvider injectFirst>
      <Slide in={props.open} direction="up" mountOnEnter unmountOnExit>
        <Paper className={classes.bottomSheet}>
          <div className={classes.contents}>
            <Typography align="center" variant="subtitle1">
              Add a memory
            </Typography>
            <Divider />
            <TextField
              value={textAreaValue}
              onChange={handleChange}
              id="standard-textarea"
              label="Content"
              placeholder=""
              multiline
              rows={12}
              fullWidth
              variant="standard"
            />
            <div className={classes.buttons}>
              <Button
                onClick={() => {
                  if (buttonProcessing.current) return;
                  buttonProcessing.current = true;
                  addNote(() => {
                    props.getNotes();
                    clearTextareaValue();
                    props.onClose();
                    buttonProcessing.current = false;
                  });
                }}
                color="primary"
              >
                Add
              </Button>
              <Button onClick={props.onClose}>Cancel</Button>
            </div>
          </div>
        </Paper>
      </Slide>
    </StyledEngineProvider>
  );
};

export default NoteCreator;
