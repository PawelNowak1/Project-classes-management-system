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
import ContentTable from '../../../../../../../components/contentTable';
import SubTitle from '../../../../../../../components/subtitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../../../../components/button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../../../../theme/constans';
import { connect } from 'react-redux';
import { getCookie } from '../../../../../../../theme/cookies';
import SummaryList from './summaryList';

function CreateSummary(props) {
    const history = useHistory();
    const {
        refresh,
        setRefresh,
        context,
        parent,
        sections,
        students,
        summary,
        user,
    } = props;

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [state, setState] = useState({
        name: '',
        limit: '',
        sectionStateCode: '',
        sectionStateName: '',
        topicName: '',
        topicId: 0,
        teacher: '',
    });

    const onSubmit = () => {
        setLoading(true);

        axios
            .post(
                `${API_URL}/sections/create`,
                {
                    name: state.name,
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
                onClick={() => history.push(parent)}
            >
                <ModalContent
                    maxWidth="550px"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Flex jc="space-between">
                        <Title secondary>Tworzenie raportu</Title>
                        <div onClick={() => history.push(parent)}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                    </Flex>
                    <Content>
                        {error && (
                            <StyledErrorMessage>
                                Nie udało się stworzyć raportu. Spróbuj ponownie
                                później.
                            </StyledErrorMessage>
                        )}
                        <SubTitle>Dane sekcji</SubTitle>
                        <ContentTable cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <th>Data</th>
                                    <th>Sekcja</th>
                                    <th>Student</th>
                                    <th>Ocena</th>
                                </tr>
                                <SummaryList
                                    summary={summary}
                                    sections={sections}
                                    students={students}
                                />
                            </tbody>
                        </ContentTable>
                        <Button
                            big
                            style={{ marginTop: '30px' }}
                            onClick={onSubmit}
                        >
                            {'Stwórz raport'}
                        </Button>
                    </Content>
                </ModalContent>
            </ModalBackground>
        </>
    );
}

CreateSummary.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(CreateSummary);

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
