import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Navigation from "./navigation/navigation";
import { connect } from "react-redux";
import {getAllContexts, logoutUser} from "../../../redux/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import Dashboard from "../../../components/dashboard";
import {Redirect, Route} from "react-router-dom";
import Students from "./content/students/students";
import Teachers from "./content/teachers/teachers";
import axios from "axios";
import {API_URL} from "../../../theme/constans";
import {getCookie} from "../../../theme/cookies";

function Admin (props) {
    const { dispatch,user } = props;

    useEffect(() => {
       dispatch(getAllContexts())
    },[]);

    return(
        <Dashboard>
            <Navigation dispatch={dispatch}/>
            <div style={{flex:'1 1',background:'rgb(240,240,240)',padding:'30px'}}>
                <Route path = '/panel/students' component={Students} />
                <Route path = '/panel/teachers' component={Teachers} />

                <Route render={() => <Redirect to="/panel/students" />} />
            </div>
        </Dashboard>
    )
};

Admin.propTypes = {
};

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user:state.auth.user
    };
}
export default connect(mapStateToProps)(Admin);