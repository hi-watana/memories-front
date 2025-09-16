# Memories Front-End (MemorySpring)

This is the front-end for the Memories application, a simple note-taking app. The interface is built with React and Material-UI.

The application is named "MemorySpring" as indicated in the top app bar.

## Features

*   **View Notes**: Displays a list of notes fetched from a back-end API.
*   **Create Notes**: A floating action button opens a dialog to add a new note.
*   **Delete Notes**: Each note has a delete button with a confirmation dialog.
*   **Dark Mode**: Automatically switches between light and dark themes based on the user's OS preference.
*   **Responsive UI**: The app bar hides on scroll to maximize screen space.

## Core Technologies

*   **React**: For building the user interface.
*   **Material-UI**: For UI components, styling, and theming.
*   **Fetch API**: For communicating with the back-end service.
*   **Create React App**: The project was bootstrapped with Create React App.

## Component Overview

*   `App.js`: The main application component that fetches and displays notes. It manages the state for the note list and the note creation dialog.
*   `TopAppBar.js`: The main navigation bar that displays the application title "MemorySpring".
*   `NoteItem.js`: Renders a single note with its content and a delete button.
*   `NoteCreator.js`: A form that slides up from the bottom to allow users to create and submit new notes.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
