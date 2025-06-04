import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from "react";
import Login from "./login";

import { useState } from 'react';

function App() {
  //login
  
  // Logged-in user
  const [user] = useState({ name: 'King George' });

  // Modes (row titles)
  const modes = ["Cash", "Cheque", "Mpesa", "Visa"];

  // Setup state
  const [formData, setFormData] = useState(
    modes.reduce((acc, mode) => {
      acc[mode] = { pos: "", banked: "", explanation: "" };
      return acc;
    }, {})
  );

  // Handle change
  const handleChange = (e, mode, field) => {
  const value = field === "explanation" ? e.target.value : e.target.value === "" ? "" : parseFloat(e.target.value);

  setFormData((prev) => ({
    ...prev,
    [mode]: {
      ...prev[mode],
      [field]: value,
    },
  }));
};


  // Calculate variance
  const getVariance = (mode) => {
  const pos = parseFloat(formData[mode].pos) || 0;
  const banked = parseFloat(formData[mode].banked) || 0;
  return pos - banked;
};

  // Sum fields
  const getTotal = (field) =>
  modes.reduce((acc, mode) => acc + (parseFloat(formData[mode][field]) || 0), 0);

  // Total variance
  const getTotalVariance = () =>
  modes.reduce((acc, mode) => acc + getVariance(mode), 0);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    alert("Report submitted!");
  };

  // 👇 RETURN GOES HERE
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">Terassen Limited</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active bg-primary text-white" href="#">Reconciliation</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Shift Management</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Reconciliation</h2>
          <span className="text-muted">Welcome, {user.name}</span>
        </div>

        {/* FORM GOES HERE */}
        <form onSubmit={handleSubmit}>
          <form onSubmit={handleSubmit}>
  <table className="table table-bordered">
    <thead className="table-light">
      <tr>
        <th>Mode</th>
        <th>POS Report</th>
        <th>Banked</th>
        <th>Variance</th>
        <th>Explanation</th>
      </tr>
    </thead>
    <tbody>
      {modes.map((mode, index) => (
        <tr key={index}>
          <td>{mode}</td>
          <td>
            <input
              type="number"
              className="form-control"
              value={formData[mode].pos}
              onChange={(e) => handleChange(e, mode, "pos")}
            />
          </td>
          <td>
            <input
              type="number"
              className="form-control"
              value={formData[mode].banked}
              onChange={(e) => handleChange(e, mode, "banked")}
            />
          </td>
          <td>
            <input
              type="number"
              className="form-control"
              value={getVariance(mode).toFixed(2)}
              readOnly
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              value={formData[mode].explanation}
              onChange={(e) => handleChange(e, mode, "explanation")}
            />
          </td>
        </tr>
      ))}

      <tr className="fw-bold">
        <td>Total</td>
        <td>
          <input
            type="number"
            className="form-control"
            value={getTotal("pos").toFixed(2)}
            readOnly
          />
        </td>
        <td>
          <input
            type="number"
            className="form-control"
            value={getTotal("banked").toFixed(2)}
            readOnly
          />
        </td>
        <td>
          <input
            type="number"
            className="form-control"
            value={getTotalVariance().toFixed(2)}
            readOnly
          />
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <button type="submit" className="btn btn-success mt-3">Submit Report</button>
</form>

        </form>
      </div>
    </div>
  );
}

export default App;
