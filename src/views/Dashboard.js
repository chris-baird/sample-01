import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

const Dashboard = () => {
  return <h1>Dashboard</h1>;
};

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <Loading />,
});
