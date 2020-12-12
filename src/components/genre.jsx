import React from "react";
import { getGenres } from "../services/fakeGenreService";

const Genre = props => {
  const { currentGenre, onGenreChange } = props;
  const Genres = getGenres();

  let classes = "list-group-item list-group-item-action ";
  return (
    <div className="list-group">
      <button
        className={
          currentGenre === "All" ? classes + "active text-white" : classes
        }
        onClick={() => onGenreChange("All")}
      >
        All Genres
      </button>
      {Genres.map(g => (
        <button
          key={g._id}
          className={
            currentGenre === g._id ? classes + "active text-white" : classes
          }
          onClick={() => onGenreChange(g._id)}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
};

export default Genre;
