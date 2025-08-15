import React from "react";
import Dashboard from "./pages/Dashboard";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Real Estate Dashboard</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;
