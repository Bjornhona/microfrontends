import React, {useRef, useEffect} from 'react';
import {mount} from 'marketing/MarketingApp';
import {useHistory} from 'react-router-dom';

const MarketingApp = () => {
    const ref = useRef();
    const browserHistory = useHistory();

    // renaming of parameter pathname to nextPathname
    const onNavigate = ({pathname: nextPathname}) => {
        const {pathname: currentPathname} = browserHistory.location;

        (currentPathname !== nextPathname) && browserHistory.push(nextPathname);
    };

    useEffect(() => {
        const {onParentNavigate} = mount(
            ref.current,
            {
                onNavigate: onNavigate,
                initialPath: browserHistory.location.pathname
            }
        );

        browserHistory.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
}

export default MarketingApp;