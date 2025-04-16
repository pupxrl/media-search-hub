import React, { useState } from "react";

// SearchInput component
// This component renders the search input and allows users to input a search term
// and choose the type of media they want to search for (e.g., music, movie, podcast, etc.)

const SearchInput = ({ onSearch }) => {
  // State for storing the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");

  // State for storing the selected media type (e.g., music, movie, podcast)
  const [mediaType, setMediaType] = useState("music");

  // Handle the form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Call the onSearch function passed as a prop with the current search term and media type
    onSearch(searchTerm, mediaType);
  };

  return (
    <form onSubmit={handleSearch}>
      {/* Input field for the search term */}
      <input
        type="text"
        value={searchTerm} // Bind the input value to the state
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state when the input changes
        placeholder="Search for music, movies, etc."
      />
      {/* Dropdown for selecting the media type */}
      <select 
        id="query"
        value={mediaType} // Bind the select value to the mediaType state
        onChange={(e) => setMediaType(e.target.value)} // Update the mediaType state when the user selects a new option
      >
        <option value="music">Music</option>
        <option value="movie">Movie</option>
        <option value="podcast">Podcast</option>
        <option value="audiobook">Audiobook</option>
        <option value="ebook">Ebook</option>
      </select>
      {/* Submit button for the search */}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchInput;