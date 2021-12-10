import React from "react";
import ActorPageTemplate from "../components/templateActorListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getActors} from '../api/tmdb-api'
import SiteHeader from "../components/siteHeader";
import Pagination from "@material-ui/lab/Pagination"

const ActorsPage = (props) => {
  const [page, setPage] = React.useState(1);
  const {data, error, isLoading, isError}  = useQuery(['people',{page : page}], getActors)
  const handleChange = (event, value) => {
    setPage(value);
    console.log(value)
  };


  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const Actors = data.results;

   return (
    <>
    <SiteHeader/>
      <ActorPageTemplate
        title="Search Actors"
        actors={Actors}
      />
        <Pagination count={data.total_pages} style={{position: 'absolute' , left:'50%',transform:'translate(-50%)'} } page={page} onChange={handleChange}/>
      </>

  );
};

export default ActorsPage; 