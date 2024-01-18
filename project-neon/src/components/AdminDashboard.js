import React from "react";

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          {/* Manage Members Section */}
          <div className="card">
            <div className="card-header text-center">
              <h5>Manage Managers</h5>
            </div>
            <div className="card-body text-center">
              <button className="btn btn-dark">Manage</button>
            </div>
          </div>

          {/* Manage Teams Section */}
          <div className="card mt-3">
            <div className="card-header text-center">
              <h5>Manage Teams</h5>
            </div>
            <div className="card-body text-center">
              <button className="btn btn-dark">Manage</button>
            </div>
          </div>

          {/* Manage Something Else Section */}
          <div className="card mt-3">
            <div className="card-header text-center">
              <h5>Manage Members</h5>
            </div>
            <div className="card-body text-center">
              <button className="btn btn-dark">Manage</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
