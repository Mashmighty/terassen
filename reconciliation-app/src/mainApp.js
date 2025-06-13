// src/MainApp.js
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function MainApp({ user }) {
  const modes = ["Cash", "Cheque", "MPesa", "Visa"];

  const initialState = modes.reduce((acc, mode) => {
    acc[mode] = { pos: "", banked: "", explanation: "" };
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e, mode, field) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [mode]: { ...formData[mode], [field]: value },
    });
  };

  const getVariance = (mode) => {
    const pos = parseFloat(formData[mode].pos) || 0;
    const banked = parseFloat(formData[mode].banked) || 0;
    return pos - banked;
  };

  const getTotal = (field) =>
    modes.reduce((sum, mode) => sum + (parseFloat(formData[mode][field]) || 0), 0);

  const getTotalVariance = () =>
    modes.reduce((sum, mode) => sum + getVariance(mode), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Report submitted successfully!");
    console.log("Form Data:", formData);
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Welcome, {user.email}</h4>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h5 className="mb-3">Reconciliation Report – Terassen Limited</h5>
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

        <button type="submit" className="btn btn-success mt-3">
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default MainApp;
