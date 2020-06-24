import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Flex,
    InputRow,
    ModalBackground,
    ModalContent,
    StyledErrorMessage,
} from '../../../../../../theme/styledComponents';
import Title from '../../../../../../components/title';
import Input from '../../../../../../components/input';
import SubTitle from '../../../../../../components/subtitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../../../components/button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../../../theme/constans';
import { connect } from 'react-redux';
import { getCookie } from '../../../../../../theme/cookies';

function EditStudent(props) {
    const history = useHistory();
    const { user, refresh, setRefresh, student } = props;

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [state, setState] = useState({
        email: student.email,
        password: '',
    });

    const onSubmit = () => {
        setLoading(true);
        axios
            .put(
                `${API_URL}/registration/${student.id}`,
                {
                    username: state.email,
                    email: state.email,
                    password: state.password,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + getCookie('token'),
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                setRefresh(!refresh);
                history.push('/panel/students');
            })
            .catch((err) => {
                setError(err);
            });
    };

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });

        console.log({
            username: state.email,
            email: state.email,
            password: state.password,
        });
    };

    return (
        <>
            <ModalBackground
                className={'show'}
                onClick={() => history.push('/panel/students')}
            >
                <ModalContent
                    maxWidth="450px"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Flex jc="space-between">
                        <Title secondary>Edycja studenta</Title>
                        <div onClick={() => history.push('/panel/students')}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                    </Flex>
                    <Content>
                        {error && (
                            <StyledErrorMessage>
                                Nie udało się edytować użytkownika. Spróbuj
                                podać inne dane.
                            </StyledErrorMessage>
                        )}
                        <SubTitle>Dane logowania</SubTitle>
                        <InputRow gtc="1fr">
                            <Input
                                label="Mail"
                                name="email"
                                value={state.email}
                                onChange={onChange}
                            />
                            <Input
                                type="password"
                                label="Hasło"
                                name="password"
                                value={state.password}
                                onChange={onChange}
                            />
                        </InputRow>
                        <Button
                            big
                            style={{ marginTop: '30px' }}
                            onClick={onSubmit}
                        >
                            {loading ? 'Loading ...' : 'Edytuj studenta'}
                        </Button>
                    </Content>
                </ModalContent>
            </ModalBackground>
        </>
    );
}

EditStudent.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(EditStudent);

const Content = styled.div``;
