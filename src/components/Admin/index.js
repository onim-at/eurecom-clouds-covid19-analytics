import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";

const AdminPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setLoading(true);

    firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      setLoading(false);
      setUsers(UserList);
    });

    return () => {
      firebase.users().off();
    };
  });

  return (
    <div>
      <h1>Admin</h1>

      {loading && <div>Loading ...</div>}

      <UserList users={users} />
    </div>
  );
};

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

export default AdminPage;
