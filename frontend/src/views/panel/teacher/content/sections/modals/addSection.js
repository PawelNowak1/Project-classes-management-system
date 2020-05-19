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

const tempSections = [{}];

function AddSection(props) {
    const history = useHistory();
    const { user, refresh, setRefresh } = props;

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [state, setState] = useState({
        name: '',
        surname: '',
        password: '',
    });

    const onSubmit = () => {
        setLoading(true);
        axios
            .post(
                `${API_URL}/registration`,
                {
                    username: `${state.name.toLowerCase()}.${state.surname.toLowerCase()}@student.polsl.pl`,
                    password: state.password,
                    email: `${state.name.toLowerCase()}.${state.surname.toLowerCase()}@student.polsl.pl`,
                    name: state.name,
                    lastName: state.surname,
                    role: 'student',
                    active: true,
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
                history.push('/panel/sections');
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
                onClick={() => history.push('/panel/sections')}
            >
                <ModalContent
                    maxWidth="450px"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Flex jc="space-between">
                        <Title secondary>Dodawanie sekcji</Title>
                        <div onClick={() => history.push('/panel/sections')}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                    </Flex>
                    <Content>
                        {error && (
                            <StyledErrorMessage>
                                Nie udało się dodać sekcji. Spróbuj podać inne
                                dane.
                            </StyledErrorMessage>
                        )}
                        <InputRow gtc="1fr">
                            <Input
                                label="Nazwa"
                                name="name"
                                value={state.name}
                                onChange={onChange}
                            />
                        </InputRow>
                        <SubTitle>Dane prowadzącego</SubTitle>
                        <InputRow gtc="1fr">
                            <Input
                                label="Imię"
                                name="leaderName"
                                value={state.leaderName}
                                onChange={onChange}
                            />
                            <Input
                                label="Nazwisko"
                                name="leaderSurname"
                                value={state.leaderSurname}
                                onChange={onChange}
                            />
                        </InputRow>
                        <SubTitle>Temat</SubTitle>
                        <InputRow gtc="1fr">
                            <Input
                                label="Rok"
                                name="year"
                                value={state.year}
                                onChange={onChange}
                            />
                            <Input
                                label="Nazwisko"
                                name="leaderSurname"
                                value={state.leaderSurname}
                                onChange={onChange}
                            />
                        </InputRow>
                        <SubTitle>Semestr</SubTitle>
                        <InputRow gtc="1fr">
                            <Input
                                label="Kierunek"
                                name="course"
                                value={state.course}
                                onChange={onChange}
                            />
                            <Input
                                label="Numer semestru"
                                name="semesterNumber"
                                value={state.semesterNumber}
                                onChange={onChange}
                            />
                            <Input
                                label="Rok akademicki"
                                name="year"
                                value={state.year}
                                onChange={onChange}
                            />
                        </InputRow>
                        <Button
                            big
                            style={{ marginTop: '30px' }}
                            onClick={onSubmit}
                        >
                            {loading ? 'Loading ...' : 'Dodaj sekcję'}
                        </Button>
                    </Content>
                </ModalContent>
            </ModalBackground>
        </>
    );
}

AddSection.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(AddSection);

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
