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
        name: student.firstName,
        surname: student.lastName,
        email: student.email,
        password: '',
        // name: '',
        // surname: '',
        // password: '',
    });

    const onSubmit = () => {
        setLoading(true);
        // axios
        //     .post(
        //         `${API_URL}/registration`,
        //         {
        //             username: `${state.name.toLowerCase()}.${state.surname.toLowerCase()}@student.polsl.pl`,
        //             password: state.password,
        //             email: `${state.name.toLowerCase()}.${state.surname.toLowerCase()}@student.polsl.pl`,
        //             name: state.name,
        //             lastName: state.surname,
        //             semesterId: props.context,
        //             role: 'student',
        //             active: true,
        //         },
        //         {
        //             headers: {
        //                 Authorization: 'Bearer ' + getCookie('token'),
        //             },
        //         }
        //     )
        //     .then((res) => {
        //         setLoading(false);
        //         setRefresh(!refresh);
        //         history.push('/panel/students');
        //     })
        //     .catch((err) => {
        //         setError(err);
        //     });
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
                                Nie udało się dodać użytkownika. Spróbuj podać
                                inne dane
                            </StyledErrorMessage>
                        )}
                        <SubTitle>Dane studenta</SubTitle>
                        <InputRow gtc="1fr">
                            <Input
                                label="Imię"
                                name="name"
                                value={state.name}
                                onChange={onChange}
                            />
                            <Input
                                label="Nazwisko"
                                name="surname"
                                value={state.surname}
                                onChange={onChange}
                            />
                        </InputRow>
                        <SubTitle>Dane logowania</SubTitle>
                        <InputRow gtc="1fr">
                            <Input
                                label="Mail"
                                name="password"
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
                            {loading ? 'Loading ...' : 'Dodaj studenta'}
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

const DownloadInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: ${({ theme }) => theme.thirdColor};
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.primaryColor};
    }
`;

const Content = styled.div``;
