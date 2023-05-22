import React from "react";

const MovieSearchBar = ({
  searchTerm,
  setSearchTerm,
}) => {
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
   return (
      <div style={{ textAlign: "center" }}
      >
        {/* <h1>Movie Search</h1> */}
        <input
          style={{ borderRadius: 10, margin: 10, border: "1px solid white", height: 30,  width: 300, padding: "20px 15px", fontSize: 18 }}
          onChange={handleChange}
          placeholder='Demander un film au raptor...'
        />
      </div>
    );
  };
export default MovieSearchBar;
