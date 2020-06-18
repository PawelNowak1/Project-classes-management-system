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
import CheckBox from "../../../../../../../components/checkbox";


function AddAttendance(props) {
    const history = useHistory();
    const { students, onBack } = props;

    const [loading, setLoading] = useState();
    const [state, setState] = useState({
        name: '',
        limit: '',
        sectionStateCode: '',
        sectionStateName: '',
        topicName: '',
        topicId: 0,
        teacher: '',
    });

    return (
        <>
            <ModalBackground
                className={'show'}
                onClick={onBack}
            >
                <ModalContent
                    maxWidth="550px"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Flex jc="space-between">
                        <Title secondary>Dodawanie obecności</Title>
                        <div onClick={onBack}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                    </Flex>
                    <Content>
                        <Row>
                            <h2>
                                Adam Wolny
                            </h2>
                            <div>
                                <CheckBox value={false} onChange={null}/>
                            </div>
                        </Row>
                        <Row>
                            <h2>
                                Adam Wolny
                            </h2>
                            <div>
                                <CheckBox value={false} onChange={null}/>
                            </div>
                        </Row>
                        <Row>
                            <h2>
                                Adam Wolny
                            </h2>
                            <div>
                                <CheckBox value={false} onChange={null}/>
                            </div>
                        </Row>
                    </Content>
                    <Button style={{margin:'0 auto',marginTop:10}}>
                        Zapisz obecność
                    </Button>
                </ModalContent>
            </ModalBackground>
        </>
    );
}

AddAttendance.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(AddAttendance);

const Row = styled.div`
    margin-bottom: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2{
        font-size: ${({ theme }) => theme.font.S};
        font-weight: ${({ theme }) => theme.font.Regular};
        color: ${({ theme }) => theme.secondColor};
        margin: 0px;
    }
`;


const Content = styled.div`
  margin-top: 20px;
`;
