import React, { useState } from "react";
import PropertyForm from "../components/PropertyForm";
import PropertyList from "../components/PropertyList";

const Dashboard: React.FC = () => {
  // Token can be null initially if you plan to fetch it later
  const [token, setToken] = useState<string>("your-token-here");
  const [refresh, setRefresh] = useState<number>(0);

  // Function to trigger PropertyList refresh
  const refreshList = () => {
    setRefresh((prev) => prev + 1);
  };

  // Example: dynamically updating token safely
  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <div>
      {/* Optional: only render components if token exists */}
      {token && (
        <>
          <PropertyForm token={token} refreshList={refreshList} />
          <PropertyList token={token} refreshKey={refresh} />
        </>
      )}

      {/* Example login button to demonstrate safe token update */}
      {!token && (
        <button onClick={() => handleLogin("new-token-from-api")}>
          Login
        </button>
      )}
    </div>
  );
};

export default Dashboard;
