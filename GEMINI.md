# Gemini Agent Notes

This file contains technical notes for the Gemini agent to understand the project structure and conventions.

## Project Overview

This is a React-based front-end for a note-taking application called "Memories" (the UI title is "MemorySpring"). It uses Material-UI for its component library and communicates with a REST API to manage notes.

## Tech Stack

*   **Framework**: React (with Hooks)
*   **UI Library**: Material-UI
*   **Language**: JavaScript (ES6+)
*   **API Communication**: Native `fetch` API.
*   **Styling**: Material-UI's `makeStyles` (JSS).
*   **Package Manager**: npm

## Component Architecture

*   **`App.js`**:
    *   **State**: Manages `noteItems` (Array) and `noteCreatorOpen` (Boolean) using `React.useState`.
    *   **Effects**: Fetches all notes from the API on initial component mount using `React.useEffect`.
    *   **Functions**:
        *   `getNotes()`: Fetches the list of notes from `${process.env.REACT_APP_API_URI}/notes/`.
        *   `deleteNote(_id)`: Deletes a note using the API endpoint `${process.env.REACT_APP_API_URI}/notes/:id`.
    *   **Rendering**: Renders the list of `NoteItem` components and the `NoteCreator` dialog.

*   **`NoteCreator.js`**:
    *   **Props**: `open`, `onClose`, `getNotes`.
    *   **Functionality**: A slide-up panel containing a `TextField` for note content.
    *   **API Call**: `POST` request to `${process.env.REACT_APP_API_URI}/notes` to create a new note. After successful creation, it calls the `getNotes` prop to refresh the list in `App.js`.

*   **`NoteItem.js`**:
    *   **Props**: `content`, `date`, `onClick`.
    *   **Functionality**: Displays a single note. Clicking the delete icon opens a confirmation `Dialog`. Confirming the deletion invokes the `onClick` prop, which is connected to `deleteNote` in `App.js`.

*   **`TopAppBar.js`**:
    *   **Functionality**: A stateless presentational component that shows the app title "MemorySpring". It uses `useScrollTrigger` to hide automatically when the user scrolls down.

## API Endpoint

The back-end API URI is configured via the `REACT_APP_API_URI` environment variable. The following endpoints are used:

*   `GET /notes/`: Fetches all notes.
*   `POST /notes`: Creates a new note.
*   `DELETE /notes/:id`: Deletes a specific note.

## Theming

The application supports both light and dark themes. It uses `window.matchMedia("(prefers-color-scheme: dark)").matches` to detect the OS-level setting and applies a custom dark theme or the default Material-UI light theme accordingly.