import Dashboard from "./dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
import Login from './login';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("reconciliation");
  const modes = ["Cash", "Cheque", "Mpesa", "Visa"];

  const [formData, setFormData] = useState(
    modes.reduce((acc, mode) => {
      acc[mode] = { pos: "", banked: "", explanation: "" };
      return acc;
    }, {})
  );
   // Date state for the report
  const [reportDate, setReportDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const handleChange = (e, mode, field) => {
    const value = field === "explanation"
      ? e.target.value
      : e.target.value === ""
      ? ""
      : parseFloat(e.target.value);

    setFormData((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [field]: value,
      },
    }));
  };

  const getVariance = (mode) => {
    const pos = parseFloat(formData[mode].pos) || 0;
    const banked = parseFloat(formData[mode].banked) || 0;
    return pos - banked;
  };

  const getTotal = (field) =>
    modes.reduce((acc, mode) => acc + (parseFloat(formData[mode][field]) || 0), 0);

  const getTotalVariance = () =>
    modes.reduce((acc, mode) => acc + getVariance(mode), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Report submitted!");
    console.log("Submitted data:", formData);
  };

  // Show login page if not logged in
  if (!user) {
    return <Login onLogin={setUser} />;
  }
//logout
const handleLogout = () => {
  // Optional: sign out from Firebase if you're using it
  if (window.firebase?.auth) {
    window.firebase.auth().signOut().catch(console.error);
  }

  // Clear the local user
  setUser(null);
};

  // 👇 Main App View
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">Terassen Limited</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
    <button className={`nav-link btn btn-link text-start w-100 text-white ${currentPage === "dashboard" ? "bg-primary" : ""}`} onClick={() => setCurrentPage("dashboard")}>
      Dashboard
    </button>
  </li>
  <li className="nav-item">
    <button className={`nav-link btn btn-link text-start w-100 text-white ${currentPage === "reconciliation" ? "bg-primary" : ""}`} onClick={() => setCurrentPage("reconciliation")}>
      Reconciliation
    </button>
  </li>
  <li className="nav-item">
    <button className="nav-link btn btn-link text-start w-100 text-white" disabled>
      Shift Management
    </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Reconciliation</h2>
          <span className="text-muted">Welcome, {user.email}</span>
  <button className="btn btn-outline-danger btn-sm" onClick={() => handleLogout()}>Logout</button>
        </div>

        {/* Reconciliation Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
  <label htmlFor="reportDate" className="form-label fw-bold">Report Date:</label>
  <input
    type="date"
    id="reportDate"
    className="form-control"
    value={reportDate}
    onChange={(e) => setReportDate(e.target.value)}
  />
</div>

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
      </div>
    </div>
  );
}

export default App;
