const BASE = "http://localhost:8080"  // use this if running locally
// const BASE = "http://35.164.107.214:8080" // edit this with your AWS endpoint
const URI = BASE + "/api"

const ManagerApi = {

    getAll: (setStudentList) => {

        fetch(URI + "/students")
            .then( result => result.json() )
            .then( data => {
                setStudentList(data)
            } )
            .catch( error => { console.log(error) } )
    },

    doesUsernameExist: (account) => {

        // First, Check if the username already exists in the DB
        return fetch(URI + "/managers")
            .then( result => result.json() )
            .then( data => {

                    for (let x of data) {
                        if (x.username === account.username) {
                            // Username is already in the database
                            return true;
                        }
                    }
                    return false;
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
                console.log(response)
                console.log("update")
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
                console.log("error update")
                // Log more details about the error
                // console.error('An error occurred during authentication:', error);
                throw error; // Propagate the error to the next catch block
            });
    },
}

export default ManagerApi;
