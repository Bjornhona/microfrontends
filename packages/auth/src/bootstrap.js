import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from "./App";

// Define mount funtion to start the App
const mount = (el, {onNavigate, defaultHistory, initialPath, onSignIn }) => {
    const memoryHistory = defaultHistory || createMemoryHistory({initialEntries: [initialPath]});

    onNavigate && memoryHistory.listen(onNavigate);

    ReactDOM.render(<App history={memoryHistory} onSignIn={onSignIn} />, el);

    const onParentNavigate = ({pathname: nextPathname}) => {
        const {pathname: currentPathname} = memoryHistory.location;

        (currentPathname !== nextPathname) && memoryHistory.push(nextPathname);
    }

    return {
        onParentNavigate: onParentNavigate
    }
}

// If in development then start the App immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');

    devRoot && mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// To run through the Container export the mount function
export { mount };