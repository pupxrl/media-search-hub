import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import ResultsDisplay from "./components/ResultsDisplay";
import FavouriteList from "./components/FavouriteList";
import './App.css';

const App = () => {
  // State variables to manage app data
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for token in sessionStorage
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // Fetch search results from the iTunes API based on search term and media type
  const fetchSearchResults = async (term, mediaType) => {
    try {
      // Send GET request to the server with the token in the Authorization header
      const response = await axios.get(`/api/search?term=${term}&mediaType=${mediaType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data.results); // Update results with data from the response
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch results. Check your token or connection.");
    }
  };

  // Add item to favourites list
  const addToFavourites = (item) => {
    if (!favourites.some((fave) => fave.collectionId === item.collectionId)) {
      setFavourites((prev) => [...prev, item]); // Add item to favourites
    }
  };

  // Remove item from favourites list
  const removeFromFavourites = (item) => {
    setFavourites((prev) => prev.filter((i) => i.collectionId !== item.collectionId));
  };

  // Toggle between Dark and Light mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.style.setProperty(
      "--light-bg-color",
      isDarkMode ? "white" : "#121212"
    );
    document.documentElement.style.setProperty(
      "--light-text-color",
      isDarkMode ? "black" : "white"
    );
  };

  // Generate a token when the page loads
  useEffect(() => {
    if (!token) {
      generateToken();
    }
  }, [token]);

  // Function to generate a new token
  const generateToken = async () => {
    try {
      const response = await axios.get("/api/generate-token");
      sessionStorage.setItem("token", response.data.token); // Store token in sessionStorage
      setToken(response.data.token); // Set token state
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  return (
    <div className="App">
      <h1>iTunes Search</h1>

      <button className="dark-mode-button" onClick={toggleDarkMode}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <FavouriteList
        favourites={favourites}
        removeFromFavourites={removeFromFavourites}
      />

      <SearchInput onSearch={fetchSearchResults} />

      <ResultsDisplay results={results} onAddToFavourites={addToFavourites} />
    </div>
  );
};

export default App;
