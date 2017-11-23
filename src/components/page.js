import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import gql from "graphql-tag";
import React from "react";
import styles from "./page.scss";

const client = new ApolloClient({
  link: new HttpLink({uri: "http://api.elementary.com.dev/graphql"}),
  cache: new InMemoryCache()
});

const query = gql`
  query {
    user(id: 1) {
      id
      name
    }
  }
`;

const render = () => {
  client.query({query: query})
    .then(success => console.log(success))
    .catch(reason => console.log("Exception", reason));

  return (<div className={styles.root}>
    Trying some GraphQL
  </div>);
};

const Page = props => render({props});
export default Page;
