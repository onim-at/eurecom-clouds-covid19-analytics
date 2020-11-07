import React from 'react';
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const Navigation = () => (
  <div>
    <ul>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.COUNTRY}>Country</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign in</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_UP}>Sign up</Link>
        </li>
    </ul>
  </div>
);
 
export default Navigation;