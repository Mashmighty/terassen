import React from "react";

const Dashboard = ({ formData, getTotal }) => {
  return (
    <div className="p-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="card shadow-sm mb-3" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title">Total Banked</h5>
          <p className="card-text fs-4 fw-bold text-success">
            KES {getTotal("banked").toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
