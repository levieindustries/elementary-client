import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "../home/layout.js";
import NotFound from "../shared/not-found";
import AuthenticatedRoute from "../shared/authenticated-route";

const render = () =>
  <BrowserRouter>
    <Switch>
      <AuthenticatedRoute exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>;

const RootLayout = props => render({props});
export default RootLayout;
