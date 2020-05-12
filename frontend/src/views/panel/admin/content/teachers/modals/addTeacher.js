import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {Flex, InputRow, ModalBackground, ModalContent} from "../../../../../../theme/styledComponents";
import Title from "../../../../../../components/title";
import Input from "../../../../../../components/input";
import SubTitle from "../../../../../../components/subtitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../../components/button";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {API_URL} from "../../../../../../theme/constans";
import {connect} from "react-redux";
import {getCookie} from "../../../../../../theme/cookies";

function AddTeacher (props) {
    const history = useHistory();
    const {user} = props;

    const [loading,setLoading] = useState();
    const [error,setError] = useState();

    const [state,setState] = useState({
        name:'',
        surname:'',
        password:''
    });

    const onSubmit = () => {
        setLoading(true);
        axios.post(`${API_URL}/registration`,{
                username: `${state.name.toLowerCase()}.${state.surname.toLowerCase()}@polsl.pl`,
                password: state.password,
                email: `${state.name.toLowerCase()}.${state.surname.toLowerCase()}@polsl.pl`,
                name: state.name,
                lastName: state.surname,
                role: "teacher",
                active: true
            },{
            headers:{
                'Authorization': 'Bearer ' + getCookie('token')
            }
        })
        .then(res => {
            setLoading(false);
            history.push('/panel/teachers');
        })
        .catch(err => {
            setError(err);
        })
    };

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    };

    return(
        <>
            <ModalBackground className={'show'} onClick={() =>  history.push('/panel/teachers')}>
                <ModalContent maxWidth="450px" onClick={(e) => e.stopPropagation()}>
                    <Flex jc="space-between">
                        <Title secondary>Dodawanie nauczyciela</Title>
                        <div onClick={() => history.push('/panel/teachers')}>
                            <FontAwesomeIcon icon={faTimesCircle}/>
                        </div>
                    </Flex>
                    <Content>
                        <SubTitle>Dane studenta</SubTitle>
                        <InputRow gtc="1fr">
                            <Input label="Imię" name="name" value={state.name} onChange={onChange}/>
                            <Input label="Nazwisko" name="surname" value={state.surname} onChange={onChange}/>
                        </InputRow>
                        <SubTitle>Dane logowania</SubTitle>
                        <InputRow gtc="1fr">
                            <Input type="password" label="Hasło" name="password" value={state.password} onChange={onChange}/>
                        </InputRow>
                        <Button big style={{marginTop:'30px'}} onClick={onSubmit}>
                            {
                                loading ? 'Loading ...' : 'Dodaj nauczyciela'
                            }
                        </Button>
                    </Content>
                </ModalContent>
            </ModalBackground>
        </>
    )
};

AddTeacher.propTypes = {
};

function mapStateToProps(state) {
    return {
        user:state.auth.user
    };
}
export default connect(mapStateToProps)(AddTeacher);

const DownloadInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${({theme}) => theme.thirdColor};
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover{
     color: ${({theme}) => theme.primaryColor};
  }
`;

const Content = styled.div`
  
`;
