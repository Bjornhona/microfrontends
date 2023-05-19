import { createApp } from 'vue';
import Dashboard from './components/Dashboard';

// Define mount funtion to start the App
const mount = (el) => {
    const app = createApp(Dashboard);
    app.mount(el);
}

// If in development then start the App immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_dashboard-dev-root');

    devRoot && mount(devRoot);
}

// To run through the Container export the mount function
export { mount };