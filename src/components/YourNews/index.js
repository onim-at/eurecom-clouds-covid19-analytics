import React from "react";

import { withAuthorization } from "../Session";

import * as ROLES from '../../constants/roles'

const YourNews = () => (
  <div>
    <h1>Add News</h1>
    <p> Accessible only to Writer user. </p>
  </div>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.WRITER];

export default withAuthorization(condition)(YourNews);
