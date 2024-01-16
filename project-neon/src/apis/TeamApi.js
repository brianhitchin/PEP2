
const BASE = "http://localhost:8080"  // use this if running locally

// const BASE = "http://35.164.107.214:8080"; // edit this with your AWS endpoint
const URI = BASE + "/api";

const TeamApi = {
  getTeam: (token) => {
    let myToken = "Bearer " + token;

    return fetch(URI + "/team", {
      headers: {
        "Content-Type": "application/json",
        Authorization: myToken,
      },
    })
      .then((result) => {
        // console.log("TeamApi result: " + result);
        return result.json();
      })
      .then((data) => {
        // console.log(data);

        // Check if the team exists in the response
        if (data.name != null) {
          return data; // Return the team data if a team exists
        } else {
          return null; // Return null if there's no team
        }
      })
      .catch((error) => {
        console.log(error);
        return null; // Return null in case of an error
      });
  },
  getAll: (setTeamList) => {
    return fetch(URI + "/teams")
      .then((result) => result.json())
      .then((data) => {
        setTeamList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addTeam: (team, token) => {
    let myToken = "Bearer " + token;
    fetch(URI + "/team/add", {
        method: "POST",
        body: JSON.stringify(team),
        headers: { "Content-Type": "application/json",
                    Authorization: myToken}
    })
        .then( result => result.json() )
        .then( data => {
            // console.log(data)
            if(typeof data.team_Id !== 'undefined') {
                // console.log("CREATED TEAM:")
                // console.log("data")
            } else {
                // alert("This team cannot be created for some reason.")
            }
        })
        .catch(error => {
            console.log(error);
        })
  }
};

export default TeamApi;
