import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getUpcomingMovies} from '../api/tmdb-api'
import AddToPlaylistAddIcon from '../components/cardIcons/addToWatch'

const UpcomingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('discover2', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const towatches = movies.filter(m => m.towatch)
  localStorage.setItem('towatches', JSON.stringify(towatches))
  // const addToWatches = (movieId) => true 

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistAddIcon movie={movie} />
      }}
    />
);
};

export default UpcomingMoviesPage;