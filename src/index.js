import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch} from "react-router-dom"; //Link } 
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import MustwatchMoviesPage from "./pages/mustwatchMoviesPage"; 
import TopRatedPage from "./pages/topRatedPage";
import PopularPage from "./pages/popularPage";
import NowPlayingPage from "./pages/nowPlayingMoviesPage"
import SignUpPage from "./pages/signUpPage";
import LogInPage from "./pages/logInPage";
import LogOutPage from "./pages/logoutPage";
import ActorsPage from "./pages/actorsPage";
import ActorDetailsPage from "./pages/actorDetailsPage"
import "bootstrap/dist/css/bootstrap.min.css"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1,
      refetchInterval: 1, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
            {" "}
            <Switch>
              <Route exact path="/movies/mustwatch" component={MustwatchMoviesPage} />
              <Route exact path="/reviews/form" component={AddMovieReviewPage} /> 
              <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
              <Route exact path="/movies/top_rated" component={TopRatedPage} />
              <Route exact path="/movies/popular" component={PopularPage} />
              <Route exact path="/movies/now_playing" component={NowPlayingPage} />
              <Route exact path="/signUp" component={SignUpPage} />
              <Route exact path="/logIn" component={LogInPage} />
              <Route path="/account" component={LogOutPage} />
              <Route path="/reviews/:id" component={MovieReviewPage} />
              <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
              <Route path="/movies/:id" component={MoviePage} />
              <Route path="/actors/home" component={ActorsPage} />
              <Route path="/actors/:id" component={ActorDetailsPage} />
              <Route exact path="/" component={HomePage} />
              <Redirect from="*" to="/" />
            </Switch>
      </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));