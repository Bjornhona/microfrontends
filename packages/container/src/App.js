import React, {lazy, Suspense, useState, useEffect} from 'react';
import Header from './components/Header';
import {StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Progress from "./components/Progress";
import { createBrowserHistory } from 'history';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

// Should give a short prefix for production. This fixes styling bug in production for
// material UI that in production easily generates duplicated class names if used in multiple frontends.
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

const history = createBrowserHistory();

const App = () => {
    // isSignedIn could be updated to currentUser with a state of an object with user information as {id: 1, name: etc...}
    const [isSignedIn, setIsSignedIn] = useState(false);

    const onSignIn = () => setIsSignedIn(true);
    const onSignOut = () => setIsSignedIn(false);

    useEffect(() => {
        isSignedIn && history.push('/dashboard');
    }, [isSignedIn]);

    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={onSignOut} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth"><AuthLazy onSignIn={onSignIn} /></Route>
                            <Route path="/dashboard">{!isSignedIn && <Redirect to={'/'} />}<DashboardLazy /></Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </StylesProvider>
    )
}

export default App;