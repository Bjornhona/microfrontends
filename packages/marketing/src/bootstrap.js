import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

// Define mount funtion to start the App
const mount = (el) => {
    ReactDOM.render(<App />, el);
}

// If in development then start the App immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    devRoot && mount(devRoot);
}

// To run through the Container export the mount function
export { mount };