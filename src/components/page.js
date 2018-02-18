import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";
import gql from "graphql-tag";
import React from "react";
import styles from "./page.scss";

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("authToken");

  console.log(token);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const httpLink = new HttpLink({uri: "http://api.elementary.com.dev/graphql"});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
  client.query({query: query, context: {foo: "bar"}})
    .then(success => console.log(success))
    .catch(reason => console.log("Exception", reason));

  return (<div className={styles.root}>
    Trying some GraphQL
  </div>);
};

const Page = props => render({props});
export default Page;
