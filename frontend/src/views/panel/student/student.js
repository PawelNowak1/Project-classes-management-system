import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navigation from './navigation/navigation';
import { connect } from 'react-redux';
import { getAllContexts, logoutUser } from '../../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Dashboard from '../../../components/dashboard';
import { Redirect, Route } from 'react-router-dom';
import { API_URL } from '../../../theme/constans';
import { getCookie } from '../../../theme/cookies';
import Sections from "./content/sections";
import axios from "axios";
import MySection from "./mySetion/mySection";

function Student(props) {
    const { dispatch, user, context } = props;

    const [refetch,setRefetch] = useState(false);
    const [loading,setLoading] = useState(true);
    const [section,setSection] = useState("");

    useEffect(() => {
        console.log(user.id);
        dispatch(getAllContexts(user.id));
    }, []);

    useEffect(() => {
        if(context){
            setLoading(true);
            axios.get(`${API_URL}/sections/getstudent/?semesterId=${context}&studentId=${user.id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + getCookie('token'),
                        },
                    }
                )
                .then((res) => {
                    setLoading(false);
                    setSection(res.data);
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [context,refetch]);

    return (
        <Dashboard>
            <Navigation dispatch={dispatch} loading={loading} section={section}/>
            <div
                style={{
                    flex: '1 1',
                    background: 'rgb(240,240,240)',
                    padding: '30px',
                }}
            >
            {
                !loading ?
                    <>
                        {
                            section && section !== "" ?
                                <>
                                    <Route path="/panel/my-section/:id" component={() => <MySection refetch={() => setRefetch(!refetch)} data={section}/>} />
                                    <Route render={() => <Redirect to={`/panel/my-section/${section.section.id}`} />} />
                                </>
                                :
                                <>
                                    <Route path="/panel/sections" component={() => <Sections refetch={() => setRefetch(!refetch)}/>} />
                                    <Route render={() => <Redirect to="/panel/sections" />} />
                                </>
                        }
                    </> :
                    <p>Loading ...</p>
            }
            </div>
        </Dashboard>
    );
}

Student.propTypes = {};

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user,
        context: state.context.current.id,
    };
}
export default connect(mapStateToProps)(Student);
