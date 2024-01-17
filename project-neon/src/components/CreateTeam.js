import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TeamApi from '../apis/TeamApi';

const CreateTeam = (props) => {

const history = useNavigate();
  // State to store input values
  const [team, setTeam] = useState({
      teamId: -1,
      name: "",
      type: "",
    });

    const handleChange = (event) => {
      setTeam({
        ...team,
        [event.target.name]: event.target.value,
      });
}
  // Function to handle form submission
  const handleSubmit = (e) => {
      e.preventDefault();



    // USE THE API TO CREATE A TEAM HERE
    TeamApi.addTeam(team, localStorage.getItem("jwt"))

    alert('Team successfully created');
    history("/");
  };

  const goBack = (e) => {
    e.preventDefault();


    history("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card">

            <div className="card-header text-center">
              <h2>Create Team</h2>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label htmlFor="teamName">Team Name:</label>
                  <input
                    type="text"
                    id="teamName"
                    className="form-control"
                    name='name'
                    value={team.name}
                    onChange={handleChange}
                    required/>
                </div>

                <br/>

                <div className="form-group">
                  <label htmlFor="teamType">Team Type:</label>
                  <input
                    type="text"
                    id="teamType"
                    className="form-control"
                    name='type'
                    value={team.type}
                    onChange={handleChange}
                    required/>
                </div>

                <br/>

                <div className="text-center">
                  <button type="submit" className="btn btn-dark mt-2 px-5">
                    Create Team
                  </button>
                </div>


              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
