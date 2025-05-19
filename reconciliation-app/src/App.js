import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Optional for your custom styles
import { useState } from 'react';

function App() {
  const [user] = useState({ name: 'King George' });

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">MyBusiness</h4>
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
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Reconciliation</h2>
          <span className="text-muted">Welcome, {user.name}</span>
        </div>

        {/* We'll add the form here next */}
      </div>
    </div>
  );
}

export default App;
