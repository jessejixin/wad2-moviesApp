import React from "react";
import { withRouter } from "react-router-dom";
import PageTemplate from "../components/templateActorPage";
import { getActor } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import SiteHeader from "../components/siteHeader";
import ActorDetails from "../components/actorDetails"

const ActorDetailsPage = (props) => {
  const { id } = props.match.params

  const { data: actor, error, isLoading, isError } = useQuery(["actor", { id: id }],getActor
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
    <SiteHeader/>
      {actor ? (
        <>
          <PageTemplate actor={actor}>
            <ActorDetails actor={actor} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default withRouter(ActorDetailsPage); 