import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navigation from './navigation/navigation';
import { connect } from 'react-redux';
import { getAllContexts, logoutUser } from '../../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Dashboard from '../../../components/dashboard';
import { Redirect, Route ,Switch} from 'react-router-dom';
import Sections from './content/sections/sections';
import TeacherSections from './content/sections/teacherSections';
import { API_URL } from '../../../theme/constans';
import { getCookie } from '../../../theme/cookies';
import CurrentSection from "./content/currentSetion/currentSection";
import RegisteredSection from "./content/registeredSetion/registeredSection";

function Teacher(props) {
    const { dispatch, user } = props;

    useEffect(() => {
        dispatch(getAllContexts());
    }, []);

    return (
        <Dashboard>
            <Navigation dispatch={dispatch} />
            <div
                style={{
                    flex: '1 1',
                    background: 'rgb(240,240,240)',
                    padding: '30px',
                    maxWidth:'calc(100% - 300px)'
                }}
            >
                <Switch>
                    <Route path="/panel/sections" component={Sections} />
                    <Route path="/panel/yoursections" component={TeacherSections} />
                    <Route path="/panel/section/:id" component={CurrentSection} />
                    <Route path="/panel/registered-section/:id" component={RegisteredSection} />
                    {/*<Route path = '/panel/add' component={Students} />*/}

                    <Route render={() => <Redirect to="/panel/yoursections" />} />
                </Switch>
            </div>
        </Dashboard>
    );
}

Teacher.propTypes = {};

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(Teacher);
