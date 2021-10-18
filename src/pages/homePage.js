import React, { useState, useEffect } from "react";  // Changed
import Header from "../components/headerMovieList";
import FilterCard from "../components/filterMoviesCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../components/movieList";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

// const MovieListPage = (props) => {
//   const classes = useStyles();
//   const movies = props.movies;
const MovieListPage = (props) => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
         console.log(json);
        return json.results;
      })
      .then((movies) => {
        setMovies(movies);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard />
        </Grid>
        <MovieList movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
};
export default MovieListPage;