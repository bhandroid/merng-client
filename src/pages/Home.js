import React, { useContext } from "react";
import "./../App.css";
import { useQuery } from "@apollo/react-hooks";
import { Grid, GridColumn } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "./../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "./../util/graphql";
function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <GridColumn>
            <PostForm />
          </GridColumn>
        )}
        {loading ? (
          <h1>Loading Posts ...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <GridColumn className="single" key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </GridColumn>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
