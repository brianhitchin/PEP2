// TeamMembers.js

import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import MemberApi from "../apis/MemberApi";
import "../index.css"
const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [addedMember, setAddedMember] = useState({
    id: 0,
    team: null,
    name: '',
    jersey_num: 0,
    assists: 0,
    scores: 0,
    playtime: 0,
    faults: 0
  })
  const [ap, setAp] = useState(false)

  // Simulate API call
  useEffect(() => {

    MemberApi.getMyMember(localStorage.getItem('jwt'), setMembers)

  }, []);

  const handleChange = (event) => {
    setAddedMember({
        ...addedMember,
        [event.target.name]: event.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if(addedMember.name !== "") {
      // console.log('addedmember', addedMember)
      MemberApi.addMember(localStorage.getItem('jwt'), addedMember, members, setMembers)
      setAddedMember({
        id: 0,
        team: null,
        name: '',
        jersey_num: 0,
        assists: 0,
        scores: 0,
        playtime: 0,
        faults: 0
      })
      setAp(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-center">
        {members.length > 0 ? null : (
            <small><strong>You do not currently have any members.</strong></small>)}
        {members.map((member) => (
          <div key={member.id} style={{width:"275px"}} className="d-inline-block ">
            <MemberCard member={member} setMembers={setMembers} members={members}/>
          </div>
        ))}
      </div>

      <div className="text-center">
        <hr/>
        <button className="btn btn-dark" onClick={() => setAp(!ap)}>
          {ap ? "Cancel" : "Add Player"}
        </button>
      </div>


      { ap &&
        <div className="card-body">

          <div className="row">

            <div className="col">
              <div className="form-group form-control-sm">
                <label htmlFor="teamName"><small>Name:</small></label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    name='name'
                    placeholder="Member's name"
                    value={addedMember.name}
                    onChange={handleChange}
                    required/>
              </div>

              <div className="form-group form-control-sm">
                <label htmlFor="teamName"><small>Jersey_num:</small></label>
                <input
                    type="number"
                    id="jerseynum"
                    className="form-control"
                    name='jersey_num'
                    min="0"
                    value={addedMember.jersey_num}
                    onChange={handleChange}
                    required/>
              </div>

              <div className="form-group form-control-sm">
                <label htmlFor="teamName"><small>Scores:</small></label>
                <input
                    type="number"
                    id="scores"
                    className="form-control"
                    name='scores'
                    min="0"
                    value={addedMember.scores}
                    onChange={handleChange}
                    required/>
              </div>
            </div>

            <div className="col">
              <div className="form-group form-control-sm">
                <label htmlFor="teamName"><small>Assists:</small></label>
                <input
                    type="number"
                    id="assists"
                    className="form-control"
                    name='assists'
                    min="0"
                    value={addedMember.assists}
                    onChange={handleChange}
                    required/>
              </div>

              <div className="form-group form-control-sm">
                <label htmlFor="teamName"><small>Playtime:</small></label>
                <input
                    type="number"
                    id="playtime"
                    className="form-control"
                    name='playtime'
                    min="0"
                    value={addedMember.playtime}
                    onChange={handleChange}
                    required/>
              </div>

              <div className="form-group form-control-sm">
                <label htmlFor="teamName"><small>Faults:</small></label>
                <input
                    type="number"
                    id="faults"
                    className="form-control"
                    name='faults'
                    min="0"
                    value={addedMember.faults}
                    onChange={handleChange}
                    required/>
              </div>
            </div>
          </div>




      <div className="text-center">
        <button type="submit" className="btn btn-dark mt-3 px-5" onClick={submitHandler}>
          Create Member
        </button>
      </div>


      </div>
      }
    </div>
  );
};

export default TeamMembers;
