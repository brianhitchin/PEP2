// TeamMembers.js

import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";

const TeamMembers = () => {
  const [members, setMembers] = useState([]);

  const dummyMembers = [
    {
      assists: 1,
      faults: 1,
      jerseyNumber: 1,
      name: "One",
      playtime: 1,
      scores: 1,
      teamId: 1,
    },
    {
      assists: 2,
      faults: 2,
      jerseyNumber: 2,
      name: "Two",
      playtime: 2,
      scores: 2,
      teamId: 2,
    },
    {
      assists: 3,
      faults: 3,
      jerseyNumber: 3,
      name: "Three",
      playtime: 3,
      scores: 3,
      teamId: 3,
    },
  ];

  // Simulate API call
  useEffect(() => {
    // Replace this with your actual API call
    const fetchData = async () => {
      try {
        const response = await fetch("your-api-endpoint");
        const data = await response.json();
        setMembers(data); // Assuming data is an array of member objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {dummyMembers.map((member) => (
          <div key={member.id} className="col-md-6">
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
