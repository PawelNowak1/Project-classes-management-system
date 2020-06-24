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

function EditTeacher(props) {
    const history = useHistory();
    const { user, refresh, setRefresh, teacher } = props;

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [state, setState] = useState({
        email: teacher.email,
        password: '',
    });

    const onSubmit = () => {
        setLoading(true);
        axios
            .put(
                `${API_URL}/registration/${teacher.id}`,
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
                history.push('/panel/teachers');
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
    };

    return (
        <>
            <ModalBackground
                className={'show'}
                onClick={() => history.push('/panel/teachers')}
            >
                <ModalContent
                    maxWidth="450px"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Flex jc="space-between">
                        <Title secondary>Edycja nauczyciela</Title>
                        <div onClick={() => history.push('/panel/teachers')}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                    </Flex>
                    <Content>
                        {error && (
                            <StyledErrorMessage>
                                Nie udało się dodać użytkownika. Spróbuj podać
                                inne dane
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
                            {loading ? 'Loading ...' : 'Edytuj nauczyciela'}
                        </Button>
                    </Content>
                </ModalContent>
            </ModalBackground>
        </>
    );
}

EditTeacher.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(EditTeacher);

const Content = styled.div``;
