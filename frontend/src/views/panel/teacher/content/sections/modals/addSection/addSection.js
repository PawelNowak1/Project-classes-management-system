import React, { useState, useEffect } from 'react';
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
import {
    API_URL,
    ONLY_NUMBERS_REGEX,
} from '../../../../../../../theme/constans';
import { connect } from 'react-redux';
import { getCookie } from '../../../../../../../theme/cookies';
import { sectionStates, getStateName, getStateCode } from '../../sectionStates';

function AddSection(props) {
    const history = useHistory();
    const { refresh, setRefresh, context, topics, parent } = props;

    const [loading, setLoading] = useState();
    const [loadingTopic, setLoadingTopic] = useState();
    const [error, setError] = useState();
    const [isLimitCorrect, setIsLimitCorrect] = useState(false);
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
                history.push(parent);
            })
            .catch((err) => {
                setError(err);
            });
    };

    const createTopicObject = () => {
        return {
            description: topic.topicDescription,
            name: topic.topicName,
            status: topic.topicStatus,
            teacher: {
                id: topic.teacherId,
            },
        };
    };

    const onSubmitTopic = () => {
        setLoadingTopic(true);

        var newTopic = createTopicObject();
        //dodanie nowego topicu do listy wyswietlanej, jako przedostatni element, bo ostatnia jest opcja "Dodaj nowy..."
        topics.splice(topics.length - 1, 0, newTopic);

        axios
            .post(`${API_URL}/topic/create`, newTopic, {
                headers: {
                    Authorization: 'Bearer ' + getCookie('token'),
                },
            })
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

        validateSectionLimit(e);
    };

    const onChangeTopic = (e) => {
        setTopic({
            ...topic,
            [e.target.name]: e.target.value,
        });
    };

    const validateSectionLimit = (e) => {
        if (e.target.name && e.target.name === 'limit') {
            setIsLimitCorrect(!ONLY_NUMBERS_REGEX.test(e.target.value));
        }
    };

    const findTopicInData = (e) => {
        var t = topics.find((topic) => topic.name === e.target.value);

        setState({
            ...state,
            topicId: t.id,
            topicName: t.name,
        });
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
                onClick={() => history.push(parent)}
            >
                <ModalContent
                    maxWidth="550px"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Flex jc="space-between">
                        <Title secondary>Dodawanie sekcji</Title>
                        <div onClick={() => history.push(parent)}>
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
                                error={isLimitCorrect}
                                errorText="Podaj liczbę."
                                label="Limit"
                                name="limit"
                                value={state.limit}
                                onChange={onChange}
                            />
                        </InputRow>
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
                        <div>
                            {newTopic && (
                                <>
                                    <Border>
                                        <Title secondary>
                                            Dodawanie tematu
                                        </Title>
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
                                                options={props.teachers.map(
                                                    (x) => createTeacherName(x)
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
                                    </Border>
                                </>
                            )}
                        </div>
                        {!newTopic && (
                            <Button
                                big
                                disabled={isLimitCorrect}
                                style={{ marginTop: '30px' }}
                                onClick={onSubmit}
                            >
                                {loading ? 'Loading ...' : 'Dodaj sekcję'}
                            </Button>
                        )}
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

const Border = styled.div`
    border-style: solid;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
    border-color: lightgray;
    border-width: 2px;
`;

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
