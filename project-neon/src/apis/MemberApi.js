const BASE = "http://localhost:8080" // edit this with your AWS endpoint
const URI = BASE + "/api"

const MemberApi = {

    getMyMember: (token, setMembers) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/mymembers", {
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

    addMember: (token, member, memberList, setMembers) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/members/add",  {
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

    deleteMember: (token, id, setMembers, members) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/members/" + id,  {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken
            }
        })
            .then( result => {

                if (result.ok) {
                    setMembers(members.filter(member => member.id !== id))
                    //console.log("Member deleted successfully.");
                } else {
                    console.log("Failed to delete member. Status: " + result.status);
                }

            } )
            .catch(error => { console.log(error); })


    },

    updateMember: (token, member) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/mymembers",  {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": myToken
            },
            body: JSON.stringify(member)
        })
            .then( result => {

                return result.json()
            } )
            .then( data => {

                // console.log("Updated member id: " + data.id);

            } )
            .catch(error => { console.log(error); })

    }

}

export default MemberApi;
