import React, { useState } from "react";

const dummyUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
];

const DummyManageManagers = () => {
  const [users, setUsers] = useState(dummyUsers);

  const handleUpdate = (userId) => {
    // Handle the update logic for the selected user
    console.log(`Update user with ID ${userId}`);
  };

  const handleDelete = (userId) => {
    // Handle the delete logic for the selected user
    console.log(`Delete user with ID ${userId}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

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

export default DummyManageManagers;
