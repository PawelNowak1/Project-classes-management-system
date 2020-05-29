import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Admin from './admin/admin';
import { connect } from 'react-redux';
import Teacher from './teacher/teacher';

function Panel({ user }) {
    let component;
    console.log(user);

    if (user.user.role.role === 'ROLE_ADMIN') {
        component = Admin;
    } else if (user.user.role.role === 'ROLE_TEACHER') {
        component = Teacher;
    }

    return (
        <>
            <Route path="/panel" component={component} />
        </>
    );
}

Panel.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(Panel);
