import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from '../Navigation';
import Home from '../Home';
import Country from '../Country';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <Navigation />

    <hr />

    <Route exact path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.COUNTRY} component={Country} />
    <Route path={ROUTES.SIGN_IN} component={SignIn} />
    <Route path={ROUTES.SIGN_UP} component={SignUp} />
    
  </Router>
);

export default App;
