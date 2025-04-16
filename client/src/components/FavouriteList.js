import React from "react";

// Favourites list component
// This component displays a list of the user's favourite items
// and allows the user to remove items from their favourites list.

const FavouriteList = ({ favourites, removeFromFavourites }) => {
  return (
    <div className="favourites-container">
      <h3>Your Favourites</h3>
      <ul className="favourites-list">
        {/* Conditional rendering to check if there are no favourites */}
        {favourites.length === 0 ? (
          // If there are no favourites, show a message.
          <li>No favourites added yet.</li>
        ) : (
          // If there are favourites, display them in a list.
          favourites.map((fave) => (
            <li key={fave.collectionId} className="favourite-item">
              {/* Image of the favourite item */}
              <img src={fave.artworkUrl100} alt={fave.collectionName} />
              {/* Name of the collection */}
              <span>{fave.collectionName}</span>
              {/* Button to remove the item from the favourites */}
              <button onClick={() => removeFromFavourites(fave)}>Remove</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FavouriteList;
