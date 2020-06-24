import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Select from "../../../../../components/select";
import {getStateCode, getStateName, sectionStates} from "../sections/sectionStates";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleLeft, faArrowAltCircleRight, faCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../components/button";
import {getCookie} from "../../../../../theme/cookies";
import axios from "axios";
import {API_URL} from "../../../../../theme/constans";
import Spinner from "../../../../../components/spinner";
import {connect} from "react-redux";
import CheckBox from "../../../../../components/checkbox";
import student from "../../../student/student";
import { useHistory } from "react-router-dom";

function RegisteredSection ({context,match}) {
    const history = useHistory();
    const [loading,setLoading] = useState(true);
    const [sending,setSending] = useState(false);
    const [section,setSection] = useState({});
    const [sectionStatus,setSectionStatus] = useState('');
    const [studentsInSection,setStundentsInSection] = useState([]);
    const [availableStudents,setAvailableStudents] = useState([]);

    useEffect(() => {
        if(context.id){
            setLoading(true);
            axios.get(`${API_URL}/sections/${match.params.id}`, {
                headers: {
                    Authorization: 'Bearer ' + getCookie('token'),
                },
            }).then(response => {
                setSection(response.data);
                setSectionStatus(response.data.state);
                axios.get(`${API_URL}/sections/getStudentsWithoutSection/${context.id}`, {
                    headers: {
                        Authorization: 'Bearer ' + getCookie('token'),
                    },
                }).then(response2 => {
                    setAvailableStudents(response2.data);

                    axios.get(`${API_URL}/sections/students/${response.data.id}/`, {
                        headers: {
                            Authorization: 'Bearer ' + getCookie('token'),
                        },
                    }).then(response3 => {
                        setStundentsInSection(response3.data.studentsInSection.map(item => {
                            return {
                                ...item.student.student
                            }
                        }));
                        setLoading(false);
                    }).catch(err => {
                        setStundentsInSection([]);
                        setLoading(false);
                    })
                }).catch(err => console.log(err.response));
            })
        }
    },[context]);

    const addStudent = (student) => {
        setStundentsInSection([
            ...studentsInSection,
            student
        ])
    };

    const removeStudent = (student) => {
        setStundentsInSection(studentsInSection.filter(item => item.id !== student.id))
    };

    const onSave = () => {
        setSending(true);
        axios.post(`${API_URL}/sections/updateStudentsList/`, {
            sectionId:section.id,
            studentIds:studentsInSection.map(student => student.id)
        },{
            headers: {
                Authorization: 'Bearer ' + getCookie('token'),
            },
        }).then(response => {
            if(sectionStatus !== section.state){
                axios.post(`${API_URL}/sections/status/?sectionId=${section.id}&state=${sectionStatus}`, null,{
                    headers: {
                        Authorization: 'Bearer ' + getCookie('token'),
                    },
                }).then((res) => {
                    history.goBack();
                });
            }else {
                history.goBack();
            }
        }).catch(err => console.log(err.response))
    };

    const onChangeStatus = (e) => {
        setSectionStatus(getStateCode(e.target.value));
    };

    if(loading){
        return (
            <p>Loading ...</p>
        )
    }

    return(
        <>
        <Wrapper>
            <Header>
                {section.name}
                {
                    sending &&
                        <div style={{display:'inline-block',marginLeft:10}}>
                            <Spinner width={20} height={20} white/>
                        </div>
                }
            </Header>
            <Content>
                <InfoBody>
                    <InfoSelect>
                        <div>
                            <Select
                                label="Status"
                                options={[
                                    getStateName(sectionStates.open),
                                    getStateName(sectionStates.closed),
                                    getStateName(sectionStates.cancelled),
                                    getStateName(sectionStates.finished),
                                ]}
                                value={getStateName(sectionStatus)}
                                onChange={onChangeStatus}
                            />
                        </div>
                    </InfoSelect>
                    <Button onClick={onSave}>
                        Zapisz dane
                    </Button>
                </InfoBody>
                <StudentsTable>
                    <div>
                        <StudentsTableTitle>Dostępni studenci</StudentsTableTitle>
                        {
                            availableStudents.filter(item => !studentsInSection.find(student => student.id === item.id)).map(item =>
                                <div style={{padding:'10px 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                    <div>
                                        {item.firstName}  {item.lastName}
                                    </div>
                                    {
                                        studentsInSection.length < section.sectionLimit &&
                                        <div onClick={() => addStudent(item)}>
                                            <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                        </div>
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <StudentsTableTitle>Przypisani studenci</StudentsTableTitle>
                            <p style={{margin:0}}>Limit {studentsInSection.length}/{section.sectionLimit}</p>
                        </div>
                        {
                            studentsInSection.map(item =>
                                <div style={{padding:'10px 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                    <div onClick={() => removeStudent(item)}>
                                        <FontAwesomeIcon icon={faArrowAltCircleLeft}/>
                                    </div>
                                    <div>
                                        {item.firstName}  {item.lastName}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </StudentsTable>
            </Content>
        </Wrapper>
        </>
    )
};

RegisteredSection.propTypes = {
};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        context: state.context.current,
    };
}
export default connect(mapStateToProps)(RegisteredSection);

const StudentsTableTitle = styled.h3`
color: ${({theme}) => theme.secondColor};
      font-size: ${({theme}) => theme.font.M};
   font-weight: ${({theme}) => theme.font.Bold};
   margin: 0px;
`;

const StudentsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
  >div:first-of-type{
    padding-right: 10px;
    border-right: 2px solid ${({theme}) => theme.secondColor};
  }
   >div:last-of-type{
   padding-left: 10px;
   }
`;

const InfoSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  width: 100%;
  background: ${({theme}) => theme.primaryColor};
  color: white;
  text-align: center;
  font-size: ${({theme}) => theme.font.L};
  font-weight: ${({theme}) => theme.font.Bold};
  padding: 10px;
  
`;

const Wrapper = styled.div`
  background-color: white;
  flex: 1;
`;
