import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "../components/protectedRoute";
import Login from "./login/login";
import Panel from "./panel/panel";

function Home (props) {
    const { isAuthenticated, isVerifying } = props;

    return(
        <BrowserRouter>
            <Switch>
                <ProtectedRoute
                    path="/panel"
                    component={Panel}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <Route path="/login" component={Login} />

                <Route render={() => <Redirect to="/login" />} />
            </Switch>
        </BrowserRouter>
    )
};

Home.propTypes = {
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying
    };
}
export default connect(mapStateToProps)(Home);
