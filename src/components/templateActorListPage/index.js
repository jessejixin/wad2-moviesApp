import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ActorList from "../actorList";
import FilterCard from "../filterActorsCard";


export var update = false;
export var searchQuery;

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

function ActorListPageTemplate({ actors, action}) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");

  let displayedActors = actors
  return (
    <Grid container className={classes.root}>
      <Grid item container spacing={5}>
      <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            titleFilter={nameFilter}
          />
        </Grid>
        <ActorList action={action} actors={displayedActors}></ActorList>
      </Grid>
    </Grid>
  );
}

export default ActorListPageTemplate;