import React from "react";

export function Logout() {
  const handleLogout = () => {
    // Clear the token from the cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect the user to the login page or any other desired page
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>Click the button below to logout:</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}