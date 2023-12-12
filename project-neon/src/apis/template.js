
// const BASE = "http://localhost:8080"  // use this if running locally
const BASE = "http://0.0.0.0:8080" // edit this with your AWS endpoint
const URI = BASE + "/api"

const StudentApi = {
    
    getAll: (setStudentList) => {

        fetch(URI + "/students")
            .then( result => result.json() )
            .then( data => {
                setStudentList(data)
            } )
            .catch( error => { console.log(error) } )
    },

    add: (student) => {
        
        fetch(URI + "/add/student", {
            method: "POST",
            body: JSON.stringify(student),
            headers: { "Content-Type": "application/json" }
        })
            .then( result => result.json() )
            .then( data => {

                if(typeof data.id !== 'undefined') {

                    console.log("CREATED STUDENT:");
                    console.log(data);

                    alert(`STUDENT CREATED \n` +
                        `------------------------\n` + 
                        `ID: ${data.id}\n` +
                        `First Name: ${data.firstName}\n` +
                        `Last Name: ${data.lastName}\n` +
                        `Email: ${data.email}\n` +
                        `Department: ${data.department}\n` +
                        `Image Path: ${data.imagePath}`
                    )
                }
                else {
                    alert("Student can't be created, check that you are not using an email already in use by another student.")
                }

            } )
            .catch( error => { 
                console.log(error);
            } )

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

export default StudentApi;