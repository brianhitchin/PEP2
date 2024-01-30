import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeamMembers from "./TeamMembers";
import TeamApi from "../apis/TeamApi";

const LoggedInScreen = ({ onCreateTeam }) => {
  const [hasTeam, setTeam] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [viewTeam, setViewTeam] = useState(true);
  const [teamId, setTeamId] = useState(0);
  const [openUpdate, setOpenUpdate] = useState([]);

  useEffect(() => {
    TeamApi.getTeam(localStorage.getItem("jwt"))
      .then((data) => {
        if (data !== null) {
          setTeam(true);
          setTeamData(data);
        } else {
          setTeam(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const manageTeam = (id) => {
    setViewTeam(false);
    setTeamId(id);
  };

  const deleteTeam = (id) => {

    TeamApi.deleteTeam(id, localStorage.getItem("jwt"))

    setTeamData(teamData.filter((team) => team.team_Id !== id));

    if (teamData.length === 1) {
      setTeam(false);
    }

  };

  const handleChange = (index, event) => {
    const updatedTeam = [...teamData]
    updatedTeam[index] = {
      ...updatedTeam[index], [event.target.name]: event.target.value,
    };

    setTeamData(updatedTeam);
  }
  const handleUpdate = (index) => {
    setOpenUpdate((prevOpen) => {
      const tempOpen = [...prevOpen];
      tempOpen[index] = !tempOpen[index];
      return tempOpen;
    });
  };

  const updateTeam = (index, team) => {
    const updatedTeam = { ...teamData[index] };
    // Implement your update logic here using TeamApi
    TeamApi.updateTeam(updatedTeam, localStorage.getItem("jwt"));

    setOpenUpdate((prevState) => {
      const temp = [...openUpdate];
      temp[index] = !openUpdate[index]
      return temp
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-15">
          {viewTeam ? (
            <div>
              {hasTeam ? (
                <div className="card h-100">
                  <div className="card-header text-center">
                    <h5>Teams</h5>
                  </div>
                  {teamData.map((team, index) => (
                    <div key={team.team_Id} className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          {team.name} - {team.type}
                        </h5>
                        <button
                          onClick={() => manageTeam(team.team_Id)}
                          className="btn btn-dark me-2"
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => deleteTeam(team.team_Id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                        {openUpdate[index] && (
                          <div className="mt-3 text-center">
                            <input
                              type="text"
                              className="form-control mb-2"
                              placeholder="New Team Name"
                              name='name'
                              value={team.name}
                              onChange={(e) => {handleChange(index, e)}}
                              required
                            />
                            <input
                              type="text"
                              className="form-control mb-2"
                              placeholder="New Team Type"
                              name='type'
                              value={team.type}
                              onChange={(e) => {handleChange(index, e)}}
                              required
                            />

                          </div>
                        )}
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => handleUpdate(index)}
                        >
                          Update Info
                        </button>

                        { openUpdate[index] && (
                            <button
                                className="btn btn-dark ms-2"
                                onClick={() => updateTeam(index, team)}
                            >
                              Confirm Changes
                            </button>
                        )
                        }

                      </div>
                    </div>
                  ))}
                  <div className="card-body text-center">
                    <Link to="/createTeam">
                      <button className="btn btn-dark" onClick={onCreateTeam}>
                        Create New Team
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="card-header text-center">
                    <h5>No Team</h5>
                  </div>
                  <div className="card-body">
                    <small>
                      <strong>You do not currently have a team.</strong>
                    </small>
                    <hr />
                    <Link to="/createTeam">
                      <button
                        className="btn btn-dark"
                        onClick={onCreateTeam}
                      >
                        Create Team
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card h-100">
              <div className="card-header text-center">
                <h5>Members</h5>
              </div>
              <div className="card-body">
                <TeamMembers team_id={teamId} setViewTeam={setViewTeam} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoggedInScreen;
