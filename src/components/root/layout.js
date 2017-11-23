import {ApolloClient} from "apollo-client";
import {ApolloProvider} from "react-apollo";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";
import AuthenticatedRoute from "../shared/authenticated-route";
import Home from "../home/layout.js";
import Login from "../login/index";
import NotFound from "../shared/not-found";
import React from "react";

const httpLink = new HttpLink({uri: "http://api.elementary.com.dev/graphql"});
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("authToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const render = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <AuthenticatedRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

const RootLayout = props => render({props});
export default RootLayout;
