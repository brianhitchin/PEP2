import React, { useState, useEffect } from "react";
import ManagerApi from "../apis/ManagerApi";
import MemberApi from "../apis/MemberApi";
import TeamApi from "../apis/TeamApi";

const ManageTeams = () => {
  const [teams, setTeams] = useState([]);

  // Collapse for Updating each Manager
  const [open, setOpen] = useState([]);

  const handleChange = (index, event) => {

    const updatedTeams = [...teams];
    updatedTeams[index] = {
      ...updatedTeams[index],
      [event.target.name]: event.target.value,
    };

    setTeams(updatedTeams);
  };

  const updateTeam = (index) => {

    TeamApi.adminUpdateTeam(teams[index], localStorage.getItem("jwt"));

    setOpen((prevOpen) => {
      const tempOpen = [...prevOpen];
      tempOpen[index] = !tempOpen[index];
      return tempOpen;
    });
  };

  const handleUpdate = (index) => {
    setOpen((prevOpen) => {
      const tempOpen = [...prevOpen];
      tempOpen[index] = !tempOpen[index];
      return tempOpen;
    });
  };

  const handleDelete = (teamId) => {
    // Handle the delete logic for the selected team

    TeamApi.adminDeleteTeam(teamId, localStorage.getItem("jwt"));
    setTeams(teams.filter((team) => team.team_Id !== teamId));
  };

  useEffect(() => {
    // Fetch team data
    TeamApi.adminGetAll(localStorage.getItem("jwt"))
      .then((data) => {
        setTeams(data);
        const temp = new Array(data.length).fill(false);
        setOpen(temp);
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Title Card */}
          <div className="card mb-2">
            <div className="card-header">
              <h4>Manage Teams</h4>
            </div>
          </div>

          {/* Display Users List */}
          {teams.map((team, index) => (
            <div
              key={team.team_Id}
              className={`card mb-0 ${index === 0 ? "rounded-top" : ""} ${
                index === teams.length - 1 ? "rounded-bottom" : ""
              }`}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{team.name}</h5>
                </div>
                <div>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleUpdate(index)}
                  >
                    Update
                  </button>

                  {/*  Collapse  */}
                  {open[index] ? (
                    <div className="card-body">
                      <form className="form-group form-control-sm">
                        <label htmlFor="teamName">
                          <small>Name:</small>
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-sm"
                          name="name"
                          value={team.name}
                          onChange={(e) => {
                            handleChange(index, e);
                          }}
                          required
                        />
                      </form>
                      <div className="form-group form-control-sm">
                        <label htmlFor="teamName">
                          <small>Type:</small>
                        </label>
                        <input
                          type="text"
                          id="type"
                          className="form-control"
                          name="type"
                          value={team.type}
                          onChange={(e) => {
                            handleChange(index, e);
                          }}
                          required
                        />
                      </div>

                      <hr />

                      <div className="text-center">
                        <button
                          className="btn btn-dark m-1"
                          onClick={() => {
                            updateTeam(index);
                          }}
                        >
                          Confirm Changes
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(team.team_Id)}
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

export default ManageTeams;
