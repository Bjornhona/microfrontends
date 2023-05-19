import React, {useRef, useEffect} from 'react';
import {mount} from 'dashboard/DashboardApp';

const DashboardApp = () => {
    const ref = useRef();

    // renaming of parameter pathname to nextPathname
    const onNavigate = ({pathname: nextPathname}) => {
        const {pathname: currentPathname} = browserHistory.location;

        (currentPathname !== nextPathname) && browserHistory.push(nextPathname);
    };

    useEffect(() => {
        mount(ref.current);
    }, []);

    return <div ref={ref} />;
}

export default DashboardApp;