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
import Select from '../../../../../../components/select';
import SubTitle from '../../../../../../components/subtitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../../../components/button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../../../theme/constans';
import { connect } from 'react-redux';
import { getCookie } from '../../../../../../theme/cookies';
import { sectionStates, getStateName, getStateCode } from '../sectionStates';

function AddSection(props) {
    const history = useHistory();
    const { user, refresh, setRefresh, context, topics } = props;

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [state, setState] = useState({
        name: '',
        limit: '',
        sectionStateCode: '',
        sectionStateName: '',
        topicId: 0,
        topicName: '',
    });

    const onSubmit = () => {
        setLoading(true);
        axios
            .post(
                `${API_URL}/sections/create`,
                {
                    name: state.name,
                    state: state.sectionStateCode,
                    sectionLimit: parseInt(state.limit),
                    topic: {
                        id: state.topicId,
                    },
                    semester: {
                        id: context.id,
                    },
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
                        <SubTitle>Właściwości sekcji</SubTitle>
                        <InputRow gtc="3fr">
                            <Input
                                label="Nazwa"
                                name="name"
                                value={state.name}
                                onChange={onChange}
                            />
                        </InputRow>
                        <InputRow gtc="3fr">
                            <Input
                                label="Limit"
                                name="limit"
                                value={state.sectionLimit}
                                onChange={onChange}
                            />
                        </InputRow>
                        <InputRow>
                            <Select
                                label="Stan"
                                name="sectionState"
                                options={[
                                    getStateName(sectionStates.open),
                                    getStateName(sectionStates.closed),
                                    getStateName(sectionStates.cancelled),
                                    getStateName(sectionStates.finished),
                                    getStateName(sectionStates.registered),
                                ]}
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        sectionStateCode: getStateCode(
                                            e.target.value
                                        ),
                                        sectionStateName: e.target.value,
                                    });
                                }}
                                value={state.sectionStateName}
                            />
                        </InputRow>
                        <SubTitle>Temat</SubTitle>
                        <InputRow gtc="1fr">
                            <Select
                                label="Dostępne"
                                name="topicId"
                                options={topics.map((x) => x.name)}
                                onChange={(e) => {
                                    var t = topics.find(
                                        (topic) => topic.name === e.target.value
                                    );

                                    setState({
                                        ...state,
                                        topicId: t.id,
                                        topicName: t.name,
                                    });
                                }}
                                value={state.topicName}
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
