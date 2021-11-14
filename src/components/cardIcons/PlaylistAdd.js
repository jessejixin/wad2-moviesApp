import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const AddToPlaylistAddIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToWatch = (e) => {
    e.preventDefault();
    context.addToWatch(movie);
  };
  return (
    <IconButton aria-label="PlaylistAdd" onClick={handleAddToWatch}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistAddIcon; 