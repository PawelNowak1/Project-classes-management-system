import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Flex,
    InputRow,
    ModalBackground,
    ModalContent,
    StyledErrorMessage,
} from '../../../../../../../theme/styledComponents';
import Title from '../../../../../../../components/title';
import Input from '../../../../../../../components/input';
import Select from '../../../../../../../components/select';
import SubTitle from '../../../../../../../components/subtitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../../../../components/button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../../../../theme/constans';
import { connect } from 'react-redux';
import { getCookie } from '../../../../../../../theme/cookies';
import { sectionStates, getStateName, getStateCode } from '../../sectionStates';
import AddTopic from './addTopic';

function AddSection(props) {
    const history = useHistory();
    const { user, refresh, setRefresh, context, topics, teachers } = props;

    const [loading, setLoading] = useState();
    const [loadingTopic, setLoadingTopic] = useState();
    const [error, setError] = useState();

    const [newTopic, setNewTopic] = useState(false);

    const [state, setState] = useState({
        name: '',
        limit: '',
        sectionStateCode: '',
        sectionStateName: '',
        topicName: '',
        topicId: 0,
        teacher: '',
    });

    const [topic, setTopic] = useState({
        topicName: '',
        topicStatus: '',
        topicDescription: '',
        topicId: 0,
        teacherId: 0,
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

    const onSubmitTopic = () => {
        setLoadingTopic(true);

        axios
            .post(
                `${API_URL}/topic/create`,
                {
                    description: topic.topicDescription,
                    name: topic.topicName,
                    status: topic.topicStatus,
                    teacher: {
                        id: topic.teacherId,
                    },
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + getCookie('token'),
                    },
                }
            )
            .then((res) => {
                console.log(res);
                setTopic({ ...topic, topicId: res.data });
                setState({
                    ...state,
                    topicName: topic.topicName,
                    topicId: res.data,
                });
                setNewTopic(false);
                setLoadingTopic(false);
                // setRefresh(!refresh);
                // history.push('/panel/sections');
            })
            .catch((err) => {
                setError(err);
            });
    };

    const onChange = (e) => {
        console.log(state);
        console.log(topic);
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const onChangeTopic = (e) => {
        console.log(state);
        console.log(topic);
        setTopic({
            ...topic,
            [e.target.name]: e.target.value,
        });
    };

    const findTopicInData = (e) => {
        var t = topics.find((topic) => topic.name === e.target.value);

        setState({
            ...state,
            topicId: t.id,
            topicName: t.name,
        });

        console.log(state);
        console.log(topic);
    };

    const checkIfAddingNewResource = (e) => {
        if (String(e.target.value || '').includes('Dodaj nowy...'))
            setNewTopic(true);
        else setNewTopic(false);
    };

    const createTeacherName = (teacher) => {
        return teacher.id !== -1
            ? teacher.firstName + ' ' + teacher.lastName
            : teacher.name;
    };

    const findTeacherInData = (e) => {
        let temp = e.target.value;
        var t = props.teachers.find(
            (teacher) =>
                teacher.lastName === temp.substring(temp.indexOf(' ') + 1)
        );

        setState({
            ...state,
            teacher: createTeacherName(t),
        });

        setTopic({
            ...topic,
            teacherId: t.id,
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
                        <SubTitle>Dane sekcji</SubTitle>
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
                                onChange={findTopicInData}
                                onClick={checkIfAddingNewResource}
                                value={state.topicName}
                            />
                        </InputRow>
                        {/* <AddTopic
                            visibility={newTopic}
                            setTopic={setTopic}
                            teachers={teachers}
                        /> */}
                        {newTopic && (
                            <>
                                <Title secondary>Dodawanie tematu</Title>
                                <SubTitle>Dane tematu</SubTitle>
                                <InputRow gtc="3fr">
                                    <Input
                                        label="Nazwa"
                                        name="topicName"
                                        onChange={onChangeTopic}
                                    />
                                    <Input
                                        label="Opis"
                                        name="topicDescription"
                                        onChange={onChangeTopic}
                                    />
                                    <Input
                                        label="Status"
                                        name="topicStatus"
                                        onChange={onChangeTopic}
                                    />
                                    <Select
                                        label="Nauczyciel"
                                        name="teacher"
                                        options={props.teachers.map((x) =>
                                            createTeacherName(x)
                                        )}
                                        value={state.teacher}
                                        onChange={findTeacherInData}
                                    />
                                </InputRow>
                                <Button
                                    big
                                    style={{ marginTop: '30px' }}
                                    onClick={onSubmitTopic}
                                >
                                    {loadingTopic
                                        ? 'Loading ...'
                                        : 'Dodaj temat'}
                                </Button>
                            </>
                        )}
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
