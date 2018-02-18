import {graphql} from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import React, {Component} from "react";

const loginMutation = gql`
  mutation auth($email: String!, $password: String!) {
    auth(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      auth: localStorage.getItem("authToken")
    };
  }

  render = () => (
    <div>
      Login
      <input
        type="text"
        name="email"
        value={this.state.email}
        onChange={event => {
          this.setState({email: event.target.value});
        }}
      />
      <input
        type="password"
        name="password"
        value={this.state.password}
        onChange={event => {
          this.setState({password: event.target.value});
        }}
      />
      <button
        onClick={() =>
          this.props
            .mutate({
              variables: {
                email: this.state.email,
                password: this.state.password
              }
            })
            .then(({data: {auth}}) => {
              localStorage.setItem("authToken", auth);
            })
            .catch(console.error)
        }
      >
        Login
      </button>
    </div>
  );
}

Login.propTypes = {
  mutate: PropTypes.func
};

const LoginWithMutation = graphql(loginMutation, {options: {context: {foo: "bar"}}})(Login);
export default LoginWithMutation;
