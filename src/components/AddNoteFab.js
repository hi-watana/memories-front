import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import { Fade } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const AddNoteFab = ({ setNoteCreatorOpen, noteCreatorOpen }) => {
  const classes = useStyles();

  return (
    <Fade in={!noteCreatorOpen}>
      <Fab
        aria-label={'Add'}
        color={'primary'}
        className={classes.fab}
        onClick={() => setNoteCreatorOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Fade>
  );
};

export default AddNoteFab;
