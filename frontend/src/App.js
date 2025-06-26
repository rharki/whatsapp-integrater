import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import components (we'll create these next)
import Dashboard from './components/Dashboard';
import Templates from './components/Templates';
import Messages from './components/Messages';
import Responses from './components/Responses';
import Polls from './components/Polls';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Header */}
        <header className="App-header">
          <nav className="navbar">
            <div className="nav-brand">
              <h1>📱 WhatsApp Integrator</h1>
            </div>
            <ul className="nav-links">
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/templates">Templates</Link></li>
              <li><Link to="/messages">Messages</Link></li>
              <li><Link to="/responses">Responses</Link></li>
              <li><Link to="/polls">Polls</Link></li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/responses" element={<Responses />} />
            <Route path="/polls" element={<Polls />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="App-footer">
          <p>&copy; 2024 WhatsApp Integrator. Built for learning purposes.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
