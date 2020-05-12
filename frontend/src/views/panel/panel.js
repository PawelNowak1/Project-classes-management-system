import React from 'react';
import PropTypes from 'prop-types';
import {Route} from "react-router-dom";
import Students from "./admin/content/students/students";
import Admin from "./admin/admin";

function Panel () {
    return(
        <>
                <Route path = '/panel' component={Admin} />
        </>
    )
};

Panel.propTypes = {
};

export default Panel;