import React, { useState, useEffect } from "react";
import ManagerApi from "../apis/ManagerApi";

const ManageManagers = () => {
  const [users, setUsers] = useState([]);

  const handleUpdate = (userId) => {
    // Handle the update logic for the selected user
    console.log(`Update user with ID ${userId}`);
  };

  const handleDelete = (userId) => {
    // Handle the delete logic for the selected user
    console.log(`Delete user with ID ${userId}`);
  };

  useEffect(() => {
    // Fetch user data (THIS NEEDS TO BE UPDATED WITH WHATEVER IT IS CALLED)
    ManagerApi.getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          {/* Title Card */}
          <div className="card mb-2">
            <div className="card-header">
              <h4>Manage Managers</h4>
            </div>
          </div>

          {/* Display Users List */}
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`card mb-0 ${index === 0 ? "rounded-top" : ""} ${index === users.length - 1 ? "rounded-bottom" : ""}`}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{user.name}</h5>
                </div>
                <div>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleUpdate(user.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ManageManagers;
