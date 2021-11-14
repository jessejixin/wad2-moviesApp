import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromMustWatches from "../components/cardIcons/removeFromMustWatch";

const MustwatchMoviesPage = () => {
  const {towatches: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const mustwatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = mustwatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = mustwatchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });
  // const toDo = () => true;

  return (
    <PageTemplate
      title="Must watch Movies"
      movies={movies}
      action={(movie) => {
        return <RemoveFromMustWatches movie={movie} />
      }}
    />
  );
};

export default MustwatchMoviesPage;