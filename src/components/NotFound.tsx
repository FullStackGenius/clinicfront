import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div
    style={{
      textAlign: "center",
      padding: "50px",
      backgroundColor: "#f9f9f9",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1
      style={{
        fontSize: "80px",
        fontWeight: "bold",
        color: "#FE6002",
        margin: "0",
      }}
    >
      404
    </h1>
    <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}>
      Page Not Found
    </h2>
    <p style={{ fontSize: "18px", color: "#666", marginTop: "10px" }}>
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link
      to="/"
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#fe6002",
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
        borderRadius: "5px",
        transition: "0.3s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d95300")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fe6002")}
    >
      Go Back Home
    </Link>
  </div>
  );
};

export default NotFound;
