import React, { useState, useEffect } from "react";
import MemberApi from "../apis/MemberApi";

const ManageMembers = () => {

    const [members, setMembers] = useState([]);

    // Collapse for Updating each Member
    const [open, setOpen] = useState([]);

    const handleChange = (index, event) => {

        const updatedMembers = [...members];
        updatedMembers[index] = {
            ...updatedMembers[index],
            [event.target.name]: event.target.value,
        };

        setMembers(updatedMembers);
    };

    const updateMember = (index, e) => {

        MemberApi.adminUpdateMember(members[index],localStorage.getItem("jwt"))

        setOpen((prevOpen) => {
            const tempOpen = [...prevOpen];
            tempOpen[index] = !tempOpen[index];
            return tempOpen;
        });

    };

    const handleUpdate = (e, index) => {

        setOpen((prevOpen) => {
            const tempOpen = [...prevOpen];
            tempOpen[index] = !tempOpen[index];
            return tempOpen;
        });
    };

    const handleDelete = (memberId) => {

        // Handle the delete logic for the selected member
        MemberApi.adminDeleteMember(memberId, localStorage.getItem("jwt"))
        setMembers(members.filter(member => member.id !== memberId))

    };

    useEffect(() => {

        // Fetch member data
        MemberApi.getAllMembers(localStorage.getItem("jwt"))
            .then((data) => {
                console.log("User data: ", data);
                setMembers(data);
                const temp = new Array(data.length).fill(false)
                setOpen(temp)
            })
            .catch((error) => {
                console.error("Error fetching member data:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    {/* Title Card */}
                    <div className="card mb-2">
                        <div className="card-header">
                            <h4>Manage Members</h4>
                        </div>
                    </div>


                    {/* Display Users List */}
                    {members.map((member, index) => (
                        <div className={`card mb-0 ${index === 0 ? "rounded-top" : ""} ${index === member.length - 1 ? "rounded-bottom" : ""}`}
                             key={member.id}>
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">{member.name}</h5>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={(e) => handleUpdate(e, index)}>
                                        Update
                                    </button>

                                    {/*  Collapse  */}
                                    { open[index] ?
                                        <div className="card-body">
                                            <form className="form-group form-control-sm">
                                                <label><small>Name:</small></label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="form-control form-control-sm"
                                                    name='name'
                                                    value={member.name}
                                                    onChange={(e) => {handleChange(index, e)}}
                                                    required/>
                                            </form>

                                            <form className="form-group form-control-sm">
                                                <label><small>Jersey Number:</small></label>
                                                <input
                                                    type="number"
                                                    id="jersey_num"
                                                    className="form-control form-control-sm"
                                                    name='jersey_num'
                                                    value={member.jersey_num}
                                                    onChange={(e) => {handleChange(index, e)}}
                                                    required/>
                                            </form>

                                            <form className="form-group form-control-sm">
                                                <label><small>Active:</small></label>
                                                <input
                                                    type="text"
                                                    id="active"
                                                    className="form-control form-control-sm"
                                                    name='active'
                                                    value={member.active}
                                                    onChange={(e) => {handleChange(index, e)}}
                                                    required/>
                                            </form>

                                            <form className="form-group form-control-sm">
                                                <label><small>scores:</small></label>
                                                <input
                                                    type="number"
                                                    id="scores"
                                                    className="form-control form-control-sm"
                                                    name='scores'
                                                    value={member.scores}
                                                    onChange={(e) => {handleChange(index, e)}}
                                                    required/>
                                            </form>

                                            <form className="form-group form-control-sm">
                                                <label><small>Playtime:</small></label>
                                                <input
                                                    type="number"
                                                    id="playtime"
                                                    className="form-control form-control-sm"
                                                    name='playtime'
                                                    value={member.playtime}
                                                    onChange={(e) => {handleChange(index, e)}}
                                                    required/>
                                            </form>

                                            <form className="form-group form-control-sm">
                                                <label><small>assists:</small></label>
                                                <input
                                                    type="number"
                                                    id="assists"
                                                    className="form-control form-control-sm"
                                                    name='assists'
                                                    value={member.assists}
                                                    onChange={(e) => {handleChange(index, e)}}
                                                    required/>
                                            </form>

                                            <form className="form-group form-control-sm">
                                                <label><small>faults:</small></label>
                                                <input
                                                    type="number"
                                                    id="faults"
                                                    className="form-control form-control-sm"
                                                    name='faults'
                                                    value={member.faults}
                                                    onChange={(e) => {handleChange(index, e)}}
                                                    required/>
                                            </form>

                                            <hr/>

                                            <div className="text-center">
                                                <button className="btn btn-primary m-1"
                                                        type="submit"
                                                        onClick={() => {updateMember(index)}}>
                                                    Confirm Changes
                                                </button>
                                            </div>
                                        </div>

                                        : null}


                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(member.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageMembers;
