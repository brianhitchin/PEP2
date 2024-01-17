import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import TeamMembers from "./TeamMembers";
import ManagerApi from "../apis/ManagerApi";
import TeamApi from "../apis/TeamApi";
import "../index.css"
import {Button} from "bootstrap/js/index.esm";

const Team = (props)  => {



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-15">

                    <div className="card-body">
                        {/* Add content for the team card */}
                        <TeamMembers />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Team;
