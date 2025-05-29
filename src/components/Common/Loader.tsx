import React from "react";
import "../../Loader.css"; // Import CSS styles

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <div className={`loader ${isLoading ? "" : "hidden"}`} style={{ display: isLoading ? "flex" : "none" }}>
      <div className="loader-button">
        <span className="loader-btns"></span>
      </div>
    </div>
  );
};

export default Loader;
