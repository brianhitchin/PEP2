
// const BASE = "http://localhost:8080"  // use this if running locally

const BASE = "http://18.246.233.50:8080" // edit this with your AWS endpoint
const URI = BASE + "/api"

const MemberApi = {

    getMyMember: (token, setMembers, team_id) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/members/" + team_id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken
            }
        })
        .then( result => result.json() )
        .then( data => {

            setMembers([...data])
        })
        .catch(error => { console.log(error); })

    },

    addMember: (token, member, memberList, setMembers, team_id) => {



        let myToken = "Bearer " + token;

        if (member.name === undefined || member.name === '') {
            member.name = "(Empty)";
        }

        fetch(URI + "/members/" + team_id,  {
            method: 'POST',
            body: JSON.stringify(member),
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken
            }
        })
        .then( result => result.json() )
        .then( data => setMembers([...memberList, data]) )
        .catch(error => { console.log(error); })
    },

    deleteMember: (token, member_id, setMembers, members, team_id) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/members/" + member_id + "/" + team_id,  {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken
            }
        })
            .then( result => {

                if (result.ok) {
                    setMembers(members.filter(member => member.id !== member_id))
                    //console.log("Member deleted successfully.");
                } else {
                    console.log("Failed to delete member. Status: " + result.status);
                }

            } )
            .catch(error => { console.log(error); })


    },

    updateMember: (token, member) => {

        let myToken = "Bearer " + token;

        if (member && member.name !== undefined && member.name === '') {
            alert("Member name cannot be blank.");
            return Promise.resolve(false);
        }

        return fetch(URI + "/members",  {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken
            },
            body: JSON.stringify(member)
        })
            .then( result => {

                if (result.ok) {

                    return Promise.resolve(true); // Return a resolved Promise with 'true'
                }
                return Promise.resolve(false);
            } )
            .catch(error => {
                console.log(error);
                return Promise.resolve(false);
            })

    },

    // Admin Endpoints

    getAllMembers: (token) => {

        let myToken = "Bearer " + token;

        return fetch(URI + "/admin/members", {
                headers: {
                "Content-Type": "application/json",
                "Authorization": myToken
                }})
            .then( result => result.json() )
            .then( data => {

                return data;
            } )
            .catch( error => { console.log(error)} )
    },

    // Member Endpoints
    // We can set the member through state or return the member as a JSON (doing both)
    getMemberById: (id, setMember, token) => {

        let myToken = "Bearer " + token;

        return fetch(URI + "/admin/members/" + id, {headers: {
                "Content-Type": "application/json",
                "Authorization": myToken
            },})
            .then( result => result.json() )
            .then( data => {
                setMember(data);
                return data;
            })
            .catch( error => {
                console.log(error);
                return false;
            })
    },

    // Keeping the setMember to set the FE state, if needed but line 136 is not needed
    adminUpdateMember: (member, token) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/admin/members", {
            method: "PATCH",
            body: JSON.stringify(member),
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken
            }
        })
            .then( newResult => newResult.json() )
            .then( newData => {
                return newData
            })
            .catch( error => {
                console.log(error);
            })
    },

    adminDeleteMember: (id, token) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/admin/members/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken}
        })
        .then( result => {
            return result;
        } )
        .catch(error => {
            console.log(error);
        })
    }

}

export default MemberApi;
