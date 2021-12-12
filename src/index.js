import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch} from "react-router-dom"; //Link } 
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import MustwatchMoviesPage from "./pages/mustwatchMoviesPage"; 
import SignUpPage from "./pages/signUpPage";
import LogInPage from "./pages/logInPage";
import LogOutPage from "./pages/logoutPage";
import "bootstrap/dist/css/bootstrap.min.css"
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));
const HomePage  = lazy(() => import("./pages/homePage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoriteMoviesPage")); // NEW
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const SiteHeader = lazy(() => import('./components/siteHeader'));
const UpcomingMoviesPage = lazy(() => import("./pages/UpcomingMoviesPage"));
const TopRatedPage = lazy(() => import( "./pages/topRatedPage"));
const PopularPage = lazy(() => import("./pages/popularPage"));
const NowPlayingPage = lazy(() => import("./pages/nowPlayingMoviesPage"));
const ActorsPage = lazy(() => import( "./pages/actorsPage"));
const ActorDetailsPage = lazy(() => import( "./pages/actorDetailsPage"));

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
      <Suspense fallback={<h1> Loading component </h1>} >
        <SiteHeader />
        </Suspense>
        <MoviesContextProvider>
            {" "}
            <Suspense fallback={<h1>Loading page</h1>}>
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
            </Suspense>
      </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));