import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import TeamMembers from "./TeamMembers";

const LoggedInScreen = ({ onCreateTeam }) => {
  const [hasTeam, setTeam] = useState(false);

  const enableTrue = (e) => {
    e.preventDefault();
    setTeam(true);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-15"> {/* Increase the column width for a larger card */}
          {hasTeam ? (
            // Display a card if the user has a team
            <div className="card h-100"> {/* Set the card height to 100% of the parent */}
              <div className="card-header">
                <h3>Your Team</h3>
              </div>
              <div className="card-body">
                {/* Add content for the team card */}
                <TeamMembers></TeamMembers>
              </div>
            </div>
          ) : (
            // Display a message and "Create Team" button if the user doesn't have a team
            <div className="card">
              <div className="card-header">
                <h3>No Team Found</h3>
              </div>
              <div className="card-body">
                <p>You do not currently have a team. Please create one.</p>
                <Link to="/createTeam">
                  <button className="btn btn-primary" onClick={onCreateTeam}>
                    Create Team
                  </button>
                </Link>
                <button className="btn btn-danger" onClick={enableTrue}>
                  temp: hasTeam = true
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoggedInScreen;
