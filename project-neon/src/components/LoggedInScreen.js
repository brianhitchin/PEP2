import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import TeamMembers from "./TeamMembers";
import ManagerApi from "../apis/ManagerApi";
import TeamApi from "../apis/TeamApi";

const LoggedInScreen = ({ onCreateTeam }) => {

  const [hasTeam, setTeam] = useState(false);
  const [teamData, setTeamData] = useState({
    id: 0,
    name: "",
    type: ""
  });

  const enableTrue = (e) => {
    e.preventDefault();
    setTeam(true);
  };

  useEffect(() => {
    TeamApi.getTeam(localStorage.getItem("jwt"))
      .then((data) => {
        if (data !== null) {
          // Team exists
          setTeam(true);
          setTeamData(data); // Update teamData with the fetched data
          // console.log(teamData)
        } else {
          // No team found
          setTeam(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-15"> {/* Increase the column width for a larger card */}

          {hasTeam ? (

            // Display a card if the user has a team
            <div className="card h-100"> {/* Set the card height to 100% of the parent */}
              <div className="card-header text-center">
                <h5>{teamData.name}</h5>
              </div>
              <div className="card-body">
                {/* Add content for the team card */}
                <TeamMembers/>
              </div>
            </div>

          ) : (
            // Display a message and "Create Team" button if the user doesn't have a team
            <div className="card">

              <div className="card-header text-center">
                <h5>No Team</h5>
              </div>

              <div className="card-body">
                <small><strong>You do not currently have a team.</strong></small>
                <hr/>
                <Link to="/createTeam">
                  <button className="btn btn-dark" onClick={onCreateTeam}>
                    Create Team
                  </button>
                </Link>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoggedInScreen;
