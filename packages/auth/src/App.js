import React from "react";
import {Switch, Route, Router} from 'react-router-dom';
import {StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// Should give a short prefix for production
const generateClassName = createGenerateClassName({
    productionPrefix: 'au'
});

const App = ({history, onSignIn}) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route path={'/auth/signin'}><SignIn onSignIn={onSignIn} /></Route>
                        <Route path={'/auth/signup'}><SignUp onSignIn={onSignIn} /></Route>
                    </Switch>
                </Router>
            </StylesProvider>
        </div>
    )
}

export default App;
