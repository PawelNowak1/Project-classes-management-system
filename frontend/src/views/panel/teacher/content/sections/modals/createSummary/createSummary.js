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
    const { context, parent, sections, students, summary, user } = props;

    const [error, setError] = useState();

    const onSubmit = () => {
        // setLoading(true);

        // axios
        //     .post(
        //         `${API_URL}/sections/create`,
        //         {
        //             name: state.name,
        //             sectionLimit: parseInt(state.limit),
        //             topic: {
        //                 id: state.topicId,
        //             },
        //             semester: {
        //                 id: context.id,
        //             },
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
        //         history.push(parent);
        //     })
        //     .catch((err) => {
        //         setError(err);
        //     });
        console.log(summary);
    };

    const isSummaryEmpty = () => {
        return summary.length === 0;
    };

    const createSubTitle = () => {
        return isSummaryEmpty()
            ? 'Brak studentów do zaraportowania.'
            : 'Liczba studentów ujętych w raporcie: ' + summary.length + '.';
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
                        <SubTitle>{createSubTitle()}</SubTitle>
                        {!isSummaryEmpty() && (
                            <div>
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
                            </div>
                        )}
                        <Button
                            big
                            disabled={isSummaryEmpty() ? true : false}
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

const Content = styled.div``;
