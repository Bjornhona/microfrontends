import React, {lazy, Suspense, useState} from 'react';
import Header from './components/Header';
import {StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

// Should give a short prefix for production. This fixes styling bug in production for
// material UI that in production easily generates duplicated class names if used in multiple frontends.
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

const App = () => {
    // isSignedIn could be updated to currentUser with a state of an object with user information as {id: 1, name: etc...}
    const [isSignedIn, setIsSignedIn] = useState(false);

    const onSignIn = () => setIsSignedIn(true);
    const onSignOut = () => setIsSignedIn(false);

    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={onSignOut} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth"><AuthLazy onSignIn={onSignIn} /></Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </BrowserRouter>
        </StylesProvider>
    )
}

export default App;