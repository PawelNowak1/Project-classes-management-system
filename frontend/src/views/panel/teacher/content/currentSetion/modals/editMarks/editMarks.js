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
import {dateNow, getCookie} from '../../../../../../../theme/cookies';
import CheckBox from "../../../../../../../components/checkbox";
import DatePicker from "../../../../../../../components/datePicker";
import Spinner from "../../../../../../../components/spinner";


function EditMarks(props) {
    const history = useHistory();
    const { students, onBack,refetch } = props;

    const [loading, setLoading] = useState();
    const [error, setError] = useState(false);
    const [state, setState] = useState({
        date: '',
        studentMarkRequestList: []
    });

    useEffect(() => {
        const array = [];
        students.map(student => {
            if(student.mark){
                array.push({
                    mark:student.mark,
                    studentSectionId:student.student.studentSectionId
                })
            }
        })

        setState({
            ...state,
            studentMarkRequestList:array
        })
    },[]);

    const changeMark = (e,studentId) => {
        if(state.studentMarkRequestList.find(student => student.studentSectionId === studentId)){
            const index = state.studentMarkRequestList.findIndex(student => student.studentSectionId === studentId);
            const array = state.studentMarkRequestList.slice(0,index).concat(state.studentMarkRequestList.slice(index+1,state.studentMarkRequestList.length));
            array.push({
                mark:e.target.value,
                studentSectionId:studentId
            });
            setState({
                ...state,
                studentMarkRequestList: array
            })
        }else {
            const array = state.studentMarkRequestList;
            array.push({
                mark:e.target.value,
                studentSectionId:studentId
            });

            setState({
                ...state,
                studentMarkRequestList: array
            });
        }
    };

    const sendMarks = () => {
        setLoading(true);
        axios.post(`${API_URL}/student/markstudents`, {
            date:`${dateNow()}T12:00:00.000`,
            studentMarkRequestList:state.studentMarkRequestList
        },{
            headers: {
                Authorization: 'Bearer ' + getCookie('token'),
            },
        }).then((res) => {
            onBack();
            refetch();
        }).catch(err => {
            console.log(err.response);
            setLoading(false);
            setError(true);
        });
    };

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
                        <Title secondary>Edytuj oceny</Title>
                        <div onClick={onBack}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                    </Flex>
                    <Content>
                        {
                            students.map(student =>
                                <Row>
                                    <h2>
                                        {student.student.student.firstName} {student.student.student.lastName}
                                    </h2>
                                    <div>
                                        <Select nolabel options={[5,4,3,2]} value={state.studentMarkRequestList.find(item => item.studentSectionId === student.student.studentSectionId) ? state.studentMarkRequestList.find(item => item.studentSectionId === student.student.studentSectionId).mark : ''} onChange={(e) => changeMark(e,student.student.studentSectionId)}/>
                                    </div>
                                </Row>
                            )
                        }
                    </Content>
                    <Button style={{margin:'0 auto',marginTop:10}} onClick={sendMarks}>
                        {
                            loading ?
                                <Spinner width={20} height={20} white/>:
                                <>Zapisz obecność</>
                        }
                    </Button>
                </ModalContent>
            </ModalBackground>
        </>
    );
}

EditMarks.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(EditMarks);

const Row = styled.div`
    margin-bottom: 5px;
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
