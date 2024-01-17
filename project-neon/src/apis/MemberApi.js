
const BASE = "http://localhost:8080"  // use this if running locally

// const BASE = "http://35.164.107.214:8080" // edit this with your AWS endpoint
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
            console.log("DATA OF MEMBERS: ", data)
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

        console.log("URI: ", URI + "/members/" + member_id + "/" + team_id)

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

    }

}

export default MemberApi;
