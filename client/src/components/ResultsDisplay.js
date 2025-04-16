import React from "react";

// ResultsDisplay component
// This component is responsible for displaying the search results fetched
// from the iTunes API, and allowing users to add results to their favourites list.

const ResultsDisplay = ({ results, onAddToFavourites }) => {
  // Remove duplicates by filtering out items with the same collectionId
  const uniqueResults = results.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.collectionId === value.collectionId)
  );

  return (
    <div className="results-container">
      {/* Conditional rendering to check if there are any results */}
      {uniqueResults.length > 0 ? (
        // If results exist, display them by mapping over the 'results' array.
        uniqueResults.map((result) => (
          <div key={result.collectionId} className="result-item">
            {/* Displaying the artwork for the item */}
            <img src={result.artworkUrl100} alt={result.collectionName} />
            {/* Displaying the collection name */}
            <h3>{result.collectionName}</h3>
            {/* Displaying the artist name */}
            <p>{result.artistName}</p>
            {/* Displaying the release date */}
            <p id="release">Release Date: {result.releaseDate}</p>
            {/* Button to add the item to the favourites */}
            <button onClick={() => onAddToFavourites(result)}>
              Add to Favourites
            </button>
          </div>
        ))
      ) : (
        // If no results were found, show a message indicating that.
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultsDisplay;
