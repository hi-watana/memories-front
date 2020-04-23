import React from 'react';
//import './App.css';

function ListItem(props) {
  return (
    <li>{props.value.date} {props.value.content} <form><button onClick={props.onClick}>Delete</button></form></li>
  );
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
      <div>
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
            <label>
              Content:
          <textarea value={this.state.textarea_value} onChange={this.handleChange} />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>

        <div>
          <form>
            <button type="submit">Reload</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
