import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Title from "../../../../../components/title";
import Button from "../../../../../components/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBuilding,
    faChevronLeft,
    faChevronRight,
    faEllipsisH,
    faPlusCircle, faTrash,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import AddStudent from "./modals/addStudent";
import {connect} from "react-redux";
import axios from 'axios';
import Select from "../../../../../components/select";
import Search from "../../../../../components/search";
import {Link, Route} from "react-router-dom";
import {API_URL} from "../../../../../theme/constans";
import {getCookie} from "../../../../../theme/cookies";
import AddTeacher from "../teachers/modals/addTeacher";

function Students (props) {
    const {user,context} = props;

    const [active,setActive] = useState(true);
    const [search,setSearch] = useState('');
    const [addClient,setAddClient] = useState(false);

    const [loading,setLoading] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [pageSettings,setPageSettings] = useState({
        activePage:0,
        totalPages:0,
    });
    const [students,setStudents] = useState([]);

    useEffect(() => {
        if(context){
            setLoading(true);
            axios.get(`${API_URL}/student/${context}/paginated/?active=${active}&${search !== '' ? 'name='+search : ''}`,{
                headers:{
                    'Authorization': 'Bearer ' + getCookie('token')
                }
            })
                .then(res => {
                    setLoading(false);
                    setStudents(res.data.content);
                    setPageSettings({
                        activePage:res.data.pageable.pageNumber,
                        totalPages:res.data.totalPages,
                    })
                }).catch(err => console.log(err.response));
        }
    },[user,refresh,search,context,active]);

    const onDelete = (email,id) => {
        if(window.confirm(`Czy chcesz dezaktywować użytkownika o emailu: ${email} ?`)){
            setLoading(true);
            axios.delete(`${API_URL}/registration/${id}`,{
                headers:{
                    'Authorization': 'Bearer ' + getCookie('token')
                }
            })
            .then(res => {
                setRefresh(!refresh);
                setLoading(false);
            });
        }
    };

    return(
        <>
        <Wrapper>
            <ContentHeader>
                <Title>Wszyscy studenci</Title>
            </ContentHeader>
            <ContentBody>
                <FiltersWrapper>
                    <div>
                        <Select label="Status" options={['Aktywni','Nieaktywni']} value={active ? 'Aktywni' : 'Nieaktywni'} onChange={(e) => setActive(e.target.value == 'Aktywni')}/>
                        {/*<Select label="Semestr" options={['1','2','3','4','5']}/>*/}
                    <Search placeHolder={"Imię / Nazwisko / Numer studenta"} value={search} onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    <div>
                        <Link to="/panel/students/add-student"><Button><FontAwesomeIcon icon={faPlusCircle}/>Dodaj studenta</Button></Link>
                    </div>
                </FiltersWrapper>
                <ContentTable cellspacing="0" cellpadding="0">
                    <tr>
                        <th>Nr. studenta</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                    {
                        students.map(student =>
                            <tr>
                                <td>#{student.id}</td>
                                <td>{student.firstName}</td>
                                <td className="name">{student.lastName}</td>
                                <td>{student.user.email}</td>
                                {/*<td>{client.mail}</td>*/}
                                {/*<td className="patron"><span>{client.patron.substr(0,2)}</span></td>*/}
                                <td className="trash"><FontAwesomeIcon icon={faTrash} onClick={() => onDelete(student.user.email,student.id)}/></td>
                            </tr>
                        )
                    }

                </ContentTable>
                {
                    loading &&
                    <div>Loading ...</div>
                }
                <Pagination>
                    {/*<span><FontAwesomeIcon icon={faChevronLeft}/></span>*/}
                    {/*<span>1</span>*/}
                    {/*<span className="active">2</span>*/}
                    {/*<span>3</span>*/}
                    {/*<span>4</span>*/}
                    {/*<span><FontAwesomeIcon icon={faChevronRight}/></span>*/}
                </Pagination>
            </ContentBody>
        </Wrapper>



            <Route path="/panel/students/add-student" component={() => <AddStudent refresh={refresh} setRefresh={setRefresh} context={context}/>}/>
        </>
    )
};

Students.propTypes = {
};

function mapStateToProps(state) {
    return {
        user:state.auth.user,
        context:state.context.current.id
    };
}
export default connect(mapStateToProps)(Students);


const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  span{
    font-size: ${({theme}) => theme.font.S};
    font-weight: ${({theme}) => theme.font.Regular};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 3px;
    cursor: pointer;
    
    &:hover{
      color: ${({theme}) => theme.primaryColor};
    }
    &.active{
      background: ${({theme}) => theme.primaryColor};
      color: white;
    }
  }
`;
const FiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  >div{
   margin-bottom: 10px;
  }
  >div:first-of-type{
    display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
        >div{
            margin-right: 10px;
         }
  }
  
`;

const StyledOption = styled.option`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: ${({theme}) => theme.font.M};
`;

const PatronSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: ${({theme}) => theme.fourthColor};
  border-radius: 3px;
  padding: 7px 25px;
  border: none;
`;

const ContentTable = styled.table`
 border-collapse:collapse;
  margin-top: 20px;
  width: 100%;
  tr{
    border-bottom: 1px solid ${({theme}) => theme.fourthColor};
    &:first-of-type, &:last-of-type{
       border-bottom: 0px;
    }
  }
  th,td{
    border: none;
    padding: 0px;
  }
  th{
    background: ${({theme}) => theme.fourthColor};
    font-size: ${({theme}) => theme.font.XS};
    font-weight: ${({theme}) => theme.font.Regular};
    color: ${({theme}) => theme.secondColor};
    padding: 6px 8px;
    text-align: left;
    &:first-of-type{
      border-radius: 3px 0 0 3px;
    }
     &:last-of-type{
      border-radius: 3px 0 0 3px;
    }
    &.textAlign-center{
      text-align: center;
    }
  }
  td{
    padding: 8px 8px;
    font-size: ${({theme}) => theme.font.XS};
    color: ${({theme}) => theme.thirdColor};
     font-weight: ${({theme}) => theme.font.Light};
     svg{
      margin: 0 auto;
      display: block;
     }
     &.name{
         color: ${({theme}) => theme.secondColor};
          min-width: 200px;
     }
     &.trash{
      cursor: pointer;
     }
     span{
      text-transform: uppercase;
         font-size: ${({theme}) => theme.font.XS};
         border-radius: 3px;
        padding: 3px 15px;
        font-weight: ${({theme}) => theme.font.Bold};
     }
    &.web{
      span{
        background:  ${({theme}) => theme.greenBackground};
        color: ${({theme}) => theme.green};
      }
    }
    
    &.comperia{
      span{
        background: ${({theme}) => theme.blueBackground};
        color: ${({theme}) => theme.blue};
      }
    }
    
    &.wlasny{
      span{
        background: ${({theme}) => theme.yellowBackground};
        color: ${({theme}) => theme.yellow};
      }
    }
    
    &.patron{
      span{
        height: 35px;
        width: 35px;
        margin: 0 auto;
        display: block;
        background: ${({theme}) => theme.fourthColor};
         font-weight: ${({theme}) => theme.font.Bold};
         font-size: ${({theme}) => theme.font.XS};
         display: flex;
         align-items: center;
         justify-content: center;
      }
    }
  }
`;

const ContentBody = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  background: white;
`;

const Wrapper = styled.div`
  
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;