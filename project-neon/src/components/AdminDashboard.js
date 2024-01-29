import React from "react";
import {Link} from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          {/* Manage Managers Section */}
          <div className="card">
            <div className="card-header text-center">
              <h5>Manage Managers</h5>
            </div>
            <div className="card-body text-center">
              <Link to="/admin/managers" className="btn btn-dark">Manage</Link>
            </div>
          </div>

          {/* Manage Teams Section */}
          <div className="card mt-3">
            <div className="card-header text-center">
              <h5>Manage Teams</h5>
            </div>
            <div className="card-body text-center">
            <Link to="/admin/teams" className="btn btn-dark">Manage</Link>
            </div>
          </div>

          {/* Manage Members Section */}
          <div className="card mt-3">
            <div className="card-header text-center">
              <h5>Manage Members</h5>
            </div>
            <div className="card-body text-center">
              <Link to="/admin/members" className="btn btn-dark">Manage</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
