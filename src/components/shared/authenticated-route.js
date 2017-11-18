import React from "react";
import {Redirect} from "react-router";

const render = ({props: {component: Component, rest}}) =>
  true ? <Component {...rest} /> : <Redirect to="/login" />;

const AuthenticatedRoute = props => render({props});

export default AuthenticatedRoute;
