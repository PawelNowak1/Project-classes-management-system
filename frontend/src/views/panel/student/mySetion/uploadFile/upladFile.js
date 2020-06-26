import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Flex,
    InputRow,
    ModalBackground,
    ModalContent,
    StyledErrorMessage,
} from '../../../../../theme/styledComponents';
import Title from '../../../../../components/title';
import Input from '../../../../../components/input';
import Select from '../../../../../components/select';
import SubTitle from '../../../../../components/subtitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../../components/button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
    API_URL,
    ONLY_NUMBERS_REGEX,
} from '../../../../../theme/constans';
import { connect } from 'react-redux';
import {dateNow, getCookie} from '../../../../../theme/cookies';
import CheckBox from "../../../../../components/checkbox";
import DatePicker from "../../../../../components/datePicker";
import Spinner from "../../../../../components/spinner";


function UpladFile(props) {
    const history = useHistory();
    const { section,user, onBack,refetch } = props;

    const [loading, setLoading] = useState();
    const [error, setError] = useState(false);
    const [state, setState] = useState({
        desc: '',
        file: null
    });


    const sendMarks = () => {
        setLoading(true);
        var formData = new FormData();
        formData.append("file", state.file);
        formData.append("description", state.desc);
        formData.append("sectionId", section.id);
        formData.append("studentId", user.id);
        axios.post(`${API_URL}/file/upload/`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
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
                        <Title secondary>Dodaj plik</Title>
                        <div onClick={onBack}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                    </Flex>
                    <Content>
                       <Input label="Komentarz" value={state.desc} onChange={(e) => setState({...state,desc:e.target.value})}/>
                       <div style={{marginTop:10}}>
                           <input type="file" value={state.file ? state.file.filename : null} onChange={(e) =>  setState({...state,file:e.target.files[0]})}/>
                       </div>
                    </Content>
                    <Button style={{margin:'0 auto',marginTop:10}} onClick={sendMarks}>
                        {
                            loading ?
                                <Spinner width={20} height={20} white/>:
                                <>Dodaj plik</>
                        }
                    </Button>
                </ModalContent>
            </ModalBackground>
        </>
    );
}

UpladFile.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(UpladFile);

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
  padding-top: 20px;
  margin-top: 20px;
`;
