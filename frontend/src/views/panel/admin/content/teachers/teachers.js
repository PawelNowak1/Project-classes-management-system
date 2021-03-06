import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from '../../../../../components/title';
import Button from '../../../../../components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faChevronLeft,
    faChevronRight,
    faEllipsisH,
    faPlusCircle,
    faTrash,
    faPen,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import AddTeacher from './modals/addTeacher';
import EditTeacher from './modals/editTeacher';
import { connect } from 'react-redux';
import axios from 'axios';
import Select from '../../../../../components/select';
import Search from '../../../../../components/search';
import { Link, Route } from 'react-router-dom';
import { API_URL } from '../../../../../theme/constans';
import { getCookie } from '../../../../../theme/cookies';

function Teachers(props) {
    const { user, context } = props;

    //REACT HOOKS
    const [active, setActive] = useState(true);
    const [search, setSearch] = useState('');

    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [pageSettings, setPageSettings] = useState({
        activePage: 0,
        totalPages: 0,
    });
    const [teachers, setTeachers] = useState([]);

    const [teacherToEdit, setTeacherToEdit] = useState({
        firstName: '',
        lastName: '',
        email: '',
        id: 0,
    });

    useEffect(() => {
        if (context) {
            setLoading(true);
            console.log(getCookie('token'));
            axios
                .get(
                    `${API_URL}/teacher/paginated/?pageSize=${50}&active=${active}&${
                        search !== '' ? '&name=' + search : ''
                    }`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + getCookie('token'),
                        },
                    }
                )
                .then((res) => {
                    setLoading(false);
                    setTeachers(res.data.content);
                    setPageSettings({
                        activePage: res.data.number,
                        totalPages: res.data.totalPages,
                        last: res.data.last,
                        first: res.data.first,
                    });
                })
                .catch((err) => console.log(err));
        }
    }, [user, refresh, search, active]);

    const onDelete = (email, id) => {
        var textInfo = active ? 'dezaktywować' : 'aktywować';
        var query = active
            ? `${API_URL}/registration/${id}`
            : `${API_URL}/registration/${id}?active=true`;

        if (
            window.confirm(
                `Czy chcesz ${textInfo} użytkownika o emailu: ${email} ?`
            )
        ) {
            setLoading(true);
            axios
                .delete(query, {
                    headers: {
                        Authorization: 'Bearer ' + getCookie('token'),
                    },
                })
                .then((res) => {
                    setRefresh(!refresh);
                    setLoading(false);
                });
        }
    };

    const onEdit = (teacher) => {
        setTeacherToEdit({
            firstName: teacher.firstName ?? '',
            lastName: teacher.lastName ?? '',
            email: teacher.user.email ?? '',
            id: teacher.id,
        });
    };
    return (
        <>
            <Wrapper>
                <ContentHeader>
                    <Title>Wszyscy nauczyciele</Title>
                </ContentHeader>
                <ContentBody>
                    <FiltersWrapper>
                        <div>
                            <Select
                                label="Status"
                                options={['Aktywni', 'Nieaktywni']}
                                value={active ? 'Aktywni' : 'Nieaktywni'}
                                onChange={(e) =>
                                    setActive(e.target.value == 'Aktywni')
                                }
                            />

                            <Search
                                placeHolder={
                                    'Imię / Nazwisko / Numer nauczyciela'
                                }
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div>
                            <Link to="/panel/teachers/add-teacher">
                                <Button>
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                    Dodaj nauczyciela
                                </Button>
                            </Link>
                        </div>
                    </FiltersWrapper>
                    <ContentTable cellspacing="0" cellpadding="0">
                        <tr>
                            <th>Nr. nauczyciela</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {teachers.map((teacher) => (
                            <tr>
                                <td>#{teacher.id}</td>
                                <td>{teacher.firstName}</td>
                                <td className="name">{teacher.lastName}</td>
                                <td>{teacher.user.email}</td>
                                <td>
                                    <Link to="/panel/teachers/edit-teacher">
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            onClick={() => onEdit(teacher)}
                                        />
                                    </Link>
                                </td>
                                <td className="trash">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() =>
                                            onDelete(
                                                teacher.user.email,
                                                teacher.id
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </ContentTable>
                    {loading && <div>Loading ...</div>}
                    <Pagination></Pagination>
                </ContentBody>
            </Wrapper>

            <Route
                path="/panel/teachers/add-teacher"
                component={() => (
                    <AddTeacher refresh={refresh} setRefresh={setRefresh} />
                )}
            />

            <Route
                path="/panel/teachers/edit-teacher"
                component={() => (
                    <EditTeacher
                        refresh={refresh}
                        setRefresh={setRefresh}
                        teacher={teacherToEdit}
                    />
                )}
            />
        </>
    );
}

Teachers.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        context: state.context.current.id,
    };
}
export default connect(mapStateToProps)(Teachers);

const Pagination = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    span {
        font-size: ${({ theme }) => theme.font.S};
        font-weight: ${({ theme }) => theme.font.Regular};
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        margin: 5px;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
            color: ${({ theme }) => theme.primaryColor};
        }
        &.active {
            background: ${({ theme }) => theme.primaryColor};
            color: white;
        }
    }
`;
const FiltersWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    > div {
        margin-bottom: 10px;
    }
    > div:first-of-type {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        > div {
            margin-right: 10px;
        }
    }
`;

const StyledOption = styled.option`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: ${({ theme }) => theme.font.M};
`;

const PatronSelect = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: ${({ theme }) => theme.fourthColor};
    border-radius: 3px;
    padding: 7px 25px;
    border: none;
`;

const ContentTable = styled.table`
    border-collapse: collapse;
    margin-top: 20px;
    width: 100%;
    tr {
        border-bottom: 1px solid ${({ theme }) => theme.fourthColor};
        &:first-of-type,
        &:last-of-type {
            border-bottom: 0px;
        }
    }
    th,
    td {
        border: none;
        padding: 0px;
    }
    th {
        background: ${({ theme }) => theme.fourthColor};
        font-size: ${({ theme }) => theme.font.XS};
        font-weight: ${({ theme }) => theme.font.Regular};
        color: ${({ theme }) => theme.secondColor};
        padding: 6px 8px;
        text-align: left;
        &:first-of-type {
            border-radius: 3px 0 0 3px;
        }
        &:last-of-type {
            border-radius: 3px 0 0 3px;
        }
        &.textAlign-center {
            text-align: center;
        }
    }
    td {
        padding: 8px 8px;
        font-size: ${({ theme }) => theme.font.XS};
        color: ${({ theme }) => theme.thirdColor};
        font-weight: ${({ theme }) => theme.font.Light};
        svg {
            margin: 0 auto;
            display: block;
        }
        &.name {
            color: ${({ theme }) => theme.secondColor};
            min-width: 200px;
        }
        &.trash {
            cursor: pointer;
        }
        span {
            text-transform: uppercase;
            font-size: ${({ theme }) => theme.font.XS};
            border-radius: 3px;
            padding: 3px 15px;
            font-weight: ${({ theme }) => theme.font.Bold};
        }
        &.web {
            span {
                background: ${({ theme }) => theme.greenBackground};
                color: ${({ theme }) => theme.green};
            }
        }

        &.comperia {
            span {
                background: ${({ theme }) => theme.blueBackground};
                color: ${({ theme }) => theme.blue};
            }
        }

        &.wlasny {
            span {
                background: ${({ theme }) => theme.yellowBackground};
                color: ${({ theme }) => theme.yellow};
            }
        }

        &.patron {
            span {
                height: 35px;
                width: 35px;
                margin: 0 auto;
                display: block;
                background: ${({ theme }) => theme.fourthColor};
                font-weight: ${({ theme }) => theme.font.Bold};
                font-size: ${({ theme }) => theme.font.XS};
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

const Wrapper = styled.div``;

export const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;