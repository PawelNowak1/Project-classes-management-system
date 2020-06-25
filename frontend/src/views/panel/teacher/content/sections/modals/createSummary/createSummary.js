import React, { useState, useEffect, ReactDOMServer } from 'react';
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
import { connect } from 'react-redux';
import SummaryList from './summaryList';
import Pdf from 'react-to-pdf';

function CreateSummary(props) {
    const history = useHistory();
    const { parent, sections, students, summary } = props;

    const [error, setError] = useState();

    const isSummaryEmpty = () => {
        return summary.length === 0;
    };

    const createSubTitle = () => {
        return isSummaryEmpty()
            ? 'Brak studentów do zaraportowania.'
            : 'Liczba studentów ujętych w raporcie: ' + summary.length + '.';
    };

    let date = new Date().toJSON().slice(0, 10).replace(/-/g, '_');
    const ref = React.createRef();

    return (
        <>
            <ModalBackground
                className={'show'}
                onClick={() => history.push(parent)}
            >
                <ModalContent
                    maxWidth="800px"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Flex jc="space-between">
                        <Title secondary>Generowanie raportu</Title>
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
                            <div id={'capture'} ref={ref}>
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
                        <Pdf targetRef={ref} filename={`raport_${date}.pdf`}>
                            {({ toPdf }) => (
                                <Button
                                    big
                                    disabled={isSummaryEmpty() ? true : false}
                                    style={{ marginTop: '30px' }}
                                    onClick={toPdf}
                                >
                                    {'Pobierz plik pdf'}
                                </Button>
                            )}
                        </Pdf>
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
