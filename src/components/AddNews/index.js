import React from "react";

import { withAuthorization } from "../Session";

const AddNews = () => (
  <div>
    <h1>Add News</h1>
    <p> Accessible only ny login user. </p>
  </div>
);

const condition = (authUser) => !!authUser;

// const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AddNews);
