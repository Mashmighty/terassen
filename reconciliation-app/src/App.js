import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
import Login from './login';
import MainApp from './mainApp'; // ✅ New import

function App() {
  const [user, setUser] = useState(null); // ✅ Login user state

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <MainApp user={user} />
      )}
    </div>
  );
}

export default App;
