import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Navigation from "./navigation/navigation";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import Dashboard from "../../../components/dashboard";
import {Redirect, Route} from "react-router-dom";

function Teacher (props) {
    const { dispatch,user } = props;

    return(
        <Dashboard>
            <Navigation dispatch={dispatch}/>
            <div style={{flex:'1 1',background:'rgb(240,240,240)',padding:'30px'}}>
                {/*<Route path = '/panel/add' component={Students} />*/}

                {/*<Route render={() => <Redirect to="/panel/students" />} />*/}
            </div>
        </Dashboard>
    )
};

Teacher.propTypes = {
};

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user:state.auth.user
    };
}
export default connect(mapStateToProps)(Teacher);