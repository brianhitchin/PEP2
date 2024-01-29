const BASE = "http://localhost:8080"  // use this if running locally
// const BASE = "http://35.164.107.214:8080" // edit this with your AWS endpoint
const URI = BASE + "/api"

const ManagerApi = {

    getAll: (token) => {
        let myToken = "Bearer " + token;
        return fetch(URI + "/admin/managers", {
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

    findUserByUsername: (username) => {

        return fetch(URI + "/managers/" + username)
            .then( result => result.json() )
            .then( data => {
               return data;
            } )
            .catch( error => { console.log(error) } )
    },

    doesUsernameExist: (username) => {

        // First, Check if the username already exists in the DB
        return fetch(URI + "/managers/" + username)
            .then( result => result.json() )
            .then( data => {

               return data.username != null;

            })
            .catch( error => {
                    console.log(error);
                    return false;
            })
    },

    createUser: (account, setAccount) => {

        // Username is not in the database
        // Create user
        fetch(URI + "/signup", {
            method: "POST",
            body: JSON.stringify(account),
            headers: { "Content-Type": "application/json" }
        })
            .then( newResult => newResult.json() )
            .then( newData => {

                setAccount(newData);

            })
            .catch( error => {
                console.log(error);
            })
    },

    login: (username, password) => {
        return fetch(URI + "/authenticate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    // Log more details about the response
                    // console.error('Authentication failed. Response:', response);
                    if(response.status === 404){
                        alert("Invalid username or password. Please try again.")
                    }
                    return Promise.reject('Authentication failed');
                }
                return response.json();
            })
            .then(data => {
                return data.jwt;
            })
            .catch(error => {
                console.log("error update:")
                // Log more details about the error
                // console.error('An error occurred during authentication:', error);
                // Propagate the error to the next catch block
                throw error;
            });
    },

    // Manager Endpoints
    // We can set the manager through state or return the manager as a JSON (doing both)
    getManagerById: (id, setManager, token) => {
        let myToken = "Bearer " + token;
        return fetch(URI + "/admin/manager/" + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken
            }
        })
            .then( result => result.json() )
            .then( data => {
                setManager(data);
                return data;
            })
            .catch( error => {
                console.log(error);
                return false;
            })
    },

    // Keeping the setManager to set the FE state, if needed but line 131 is not needed
    updateManager: (manager, token) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/admin/manager", {
            method: "PATCH",
            body: JSON.stringify(manager),
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken}
        })
            .then( newResult => {
                return newResult;
            } )
            .then( (data) => {
                if(!data.ok){
                    alert("Cannot update currently logged in admin");
                }
            })
            .catch( error => {
                alert("Cannot update currently logged in admin");
                console.error(error);
            })
    },

    // Returning true if deleted, false if not [using promise]
    deleteManager: (id, token) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/admin/manager/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken}
        })
            .then( newResult => {return newResult.json() })
        .catch(error => {
            console.log(error);
        })
}
}

export default ManagerApi;
