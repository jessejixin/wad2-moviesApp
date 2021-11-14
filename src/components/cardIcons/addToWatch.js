import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const AddToPlaylistAddIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToWatches = (e) => {
    e.preventDefault();
    context.addTowatches(movie);
  };
  return (
    <IconButton aria-label="add towatch" onClick={handleAddToWatches}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistAddIcon;