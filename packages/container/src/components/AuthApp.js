import React, {useRef, useEffect} from 'react';
import {mount} from 'auth/AuthApp';
import {useHistory} from 'react-router-dom';

const AuthApp = ({onSignIn}) => {
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
                initialPath: browserHistory.location.pathname,
                onSignIn
            },
        );

        browserHistory.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
}

export default AuthApp;