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
            headers: {
                method: 'POST',
                "Content-Type": "application/json",
                "Authorization": myToken,
                body: JSON.stringify(member),
            }
        })
        .then( result => result.json() )
        .then( data => setMembers([...memberList, data]) )
        .catch(error => { console.log(error); })
    },

    deleteMember: (token, id) => {

        let myToken = "Bearer " + token;

        fetch(URI + "/members/" + id,  {
            headers: {
                method: 'DELETE',
                "Content-Type": "application/json",
                "Authorization": myToken
            }
        })
            .then( result => {

                return result.json()
            } )
            .then( data => {

                console.log("Deleted member id: " + id);

            } )
            .catch(error => { console.log(error); })


    },

    updateMember: (token, member) => {

        /*
                How the member object should look when being used:
         */
        
        // {
        //     "id": 2,
        //     "team": {
        //     "team_Id": 4,
        //         "name": "test12345TEAM",
        //         "type": "Soccer"
        // },
        //     "name": "test12345MEMBERUPDATED",
        //     "jersey_num": 1,
        //     "scores": 2,
        //     "assists": 3,
        //     "playtime": 4,
        //     "faults": 5
        // }

        let myToken = "Bearer " + token;

        fetch(URI + "/mymembers/",  {
            headers: {
                method: 'PUT',
                body: JSON.stringify(member),
                "Content-Type": "application/json",
                "Authorization": myToken
            }
        })
            .then( result => {

                return result.json()
            } )
            .then( data => {

                console.log("Updated member id: " + data.id);

            } )
            .catch(error => { console.log(error); })

    }

}

export default MemberApi;