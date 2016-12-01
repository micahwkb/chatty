// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';

// Render sub-components
import App from './App'

ReactDOM.render(<App />, document.getElementById('react-root'));