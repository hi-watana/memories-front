import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import 'typeface-roboto'

const NoteItem = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClose = () => setIsOpen(false)
  const handleClickOpen = () => setIsOpen(true)

  return (
    <ListItem>
      <ListItemText
        primary={
          <Typography noWrap>
            {props.content}
          </Typography>
        }
        secondary={props.date}
      />
      <ListItemIcon>
        <IconButton onClick={handleClickOpen}>
          <Delete />
        </IconButton>
      </ListItemIcon>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={() => { props.onClick(); handleClose() }} variant="contained" color="secondary">
            Yes
          </Button>
          <Button onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  )
}

export default NoteItem