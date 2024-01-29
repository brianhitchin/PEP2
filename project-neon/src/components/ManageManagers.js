import React, { useState, useEffect } from "react";
import ManagerApi from "../apis/ManagerApi";
import MemberApi from "../apis/MemberApi";

const ManageManagers = () => {
  const [users, setUsers] = useState([]);

  // Collapse for Updating each Manager
  const [open, setOpen] = useState([]);

  const handleChange = (index, event) => {

    console.log(event)
    console.log(index)
    console.log("index undefined?", users[index])

    const updatedUsers = [...users];
    updatedUsers[index] = {
      ...updatedUsers[index],
      [event.target.name]: event.target.value,
    };

    setUsers(updatedUsers);
  };

  const updateManager = (index) => {

    ManagerApi.updateManager(users[index],localStorage.getItem("jwt"))

    setOpen((prevOpen) => {
      const tempOpen = [...prevOpen];
      tempOpen[index] = !tempOpen[index];
      return tempOpen;
    });

    window.location.reload()
  };

  const handleUpdate = (index) => {
    setOpen((prevOpen) => {
      const tempOpen = [...prevOpen];
      tempOpen[index] = !tempOpen[index];
      return tempOpen;
    });
  };

  const handleDelete = (userId) => {
    // Handle the delete logic for the selected user

    console.log(userId)
    ManagerApi.deleteManager(userId, localStorage.getItem("jwt"))
    setUsers(users.filter(user => user.managerId !== userId))

  };

  useEffect(() => {
    // Fetch user data (THIS NEEDS TO BE UPDATED WITH WHATEVER IT IS CALLED)
    ManagerApi.getAll(localStorage.getItem("jwt"))
      .then((data) => {
            console.log("User data: ", data);
        setUsers(data);
        const temp = new Array(data.length).fill(false)
        setOpen(temp)
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
              key={user.managerId}
              className={`card mb-0 ${index === 0 ? "rounded-top" : ""} ${index === users.length - 1 ? "rounded-bottom" : ""}`}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{user.name}</h5>
                </div>
                <div>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleUpdate(index
                    )}
                  >
                    Update
                  </button>

                  {/*  Collapse  */}
                  { open[index] ? <div className="card-body">
                        <form className="form-group form-control-sm">
                          <label htmlFor="teamName"><small>Name:</small></label>
                          <input
                              type="text"
                              id="name"
                              className="form-control form-control-sm"
                              name='name'
                              value={user.name}
                              onChange={(e) => {handleChange(index, e)}}
                              required/>
                        </form>
                        <div className="form-group form-control-sm">
                          <label htmlFor="teamName"><small>Username:</small></label>
                          <input
                              type="text"
                              id="username"
                              className="form-control"
                              name='username'
                              value={user.username}
                              onChange={(e) => {handleChange(index, e)}}
                              required
                          />
                        </div>
                        <div className="form-group form-control-sm">
                          <label htmlFor="teamName"><small>Role:</small></label>
                          <input
                              type="text"
                              id="role"
                              className="form-control"
                              name='role'
                              min="0"
                              value={user.role}
                              onChange={(e) => {handleChange(index, e)}}
                              required
                          />
                        </div>

                        <hr/>

                        <div className="text-center">
                          <button className="btn btn-primary m-1"
                                  onClick={() => {updateManager(index)}}>
                            Confirm Changes
                          </button>
                        </div>

                      </div>

                      : null}


                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.managerId
                    )}
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
