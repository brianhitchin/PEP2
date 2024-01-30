const BASE = "http://localhost:8080"; // use this if running locally

// const BASE = "http://35.164.107.214:8080"; // edit this with your AWS endpoint
const URI = BASE + "/api";

const TeamApi = {
  getTeam: (token) => {
    let myToken = "Bearer " + token;

    return fetch(URI + "/teams", {
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
        if (data[0] != null) {
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
  getAll: (setTeamList, token) => {
    let myToken = "Bearer " + token;

    return fetch(URI + "/teams", {
      headers: {
        "Content-Type": "application/json",
        Authorization: myToken,
      },
    })
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
    fetch(URI + "/teams", {
      method: "POST",
      body: JSON.stringify(team),
      headers: {
        "Content-Type": "application/json",
        Authorization: myToken,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        // console.log(data)
        if (typeof data.team_Id !== "undefined") {
          // console.log("CREATED TEAM:")
          // console.log("data")
        } else {
          // alert("This team cannot be created for some reason.")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  adminUpdateTeam: (team, token) => {
    if (team && team.name !== undefined && team.name === "") {
      alert("Team name cannot be blank.");
    }

    let myToken = "Bearer " + token;

    fetch(URI + "/admin/teams", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: myToken,
      },
      body: JSON.stringify(team),
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteTeam: (team_id, token) => {
    let myToken = "Bearer " + token;

    fetch(URI + "/teams/" + team_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: myToken,
      },
    })
      .then((result) => {
        return result.json();
      })
      .catch((error) => {
        console.log(error);
      });
  },

  adminDeleteTeam: (team_id, token) => {
    let myToken = "Bearer " + token;

    fetch(URI + "/admin/teams/" + team_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: myToken,
      },
    })
      .then((result) => {
        return result.json();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  adminGetOneTeam: (team_id, setTeam, token) => {
    let myToken = "Bearer " + token;

    fetch(URI + "/admins/teams/" + team_id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: myToken,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setTeam(data))
      .catch((e) => console.log(e));
  },
  adminGetAll:(token) => {
    let myToken = "Bearer " + token;
    return fetch(URI + "/admin/teams", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": myToken
        }
    })
        .then( result => result.json() )
        .then( data => {
            return data
        } )
        .catch( error => { console.log(error) } )
  },
  updateTeam: (team, token) => {
    if (team && team.name !== undefined && team.name === "") {
      alert("Team name cannot be blank.");
    }

    if (team && team.type !== undefined && team.type === "") {
      alert("Team type cannot be blank.");
    }

    let myToken = "Bearer " + token;

    fetch(URI + "/teams", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: myToken,
      },
      body: JSON.stringify(team),
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default TeamApi;
