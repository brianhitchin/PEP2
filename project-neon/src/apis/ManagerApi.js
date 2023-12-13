
// const BASE = "http://localhost:8080"  // use this if running locally
import {useNavigate} from "react-router-dom";

const BASE = "http://localhost:8080" // edit this with your AWS endpoint
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
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    // Log more details about the response
                    console.error('Authentication failed. Response:', response);
                    return Promise.reject('Authentication failed');
                }
                return response.json();
            })
            .then(data => {
                return data.jwt;
            })
            .catch(error => {
                // Log more details about the error
                console.error('An error occurred during authentication:', error);
                throw error; // Propagate the error to the next catch block
            });
    },

    update: (student, studentList, setStudentList) => {

        fetch(URI + "/update/student",  {
            method: 'PUT',
            body: JSON.stringify(student),
            headers: {  "Content-Type": "application/json" }
        })
            .then( result => result.json() )
            .then( data => {

                if(typeof data.id !== 'undefined') {

                    console.log("UPDATED:");
                    console.log(data);

                    const newList = [...studentList];

                    let index = -1;

                    for(let i = 0; i < newList.length; i++) {

                        if( newList[i].id === data.id ) {
                            index = i;
                            break;
                        }
                    }

                    newList.splice(index, 1, data)

                    setStudentList(newList)
                }
                else {
                    alert("Error updating student, email choosen may already be in use by another student")
                }

            } )
            .catch(error => { console.log(error); })

    },

    delete: (id) => {

        fetch(URI + "/delete/student/" + id, {
            method: "DELETE"
        })
            .then( result => result.json() )
            .then( data => {
                console.log("DELETED:");
                console.log(data);
            } )
            .catch(error => { console.log(error); })

    }
}

export default ManagerApi;