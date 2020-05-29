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
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import Select from '../../../../../components/select';
import Search from '../../../../../components/search';
import { Link, Route } from 'react-router-dom';
import { API_URL } from '../../../../../theme/constans';
import { getCookie } from '../../../../../theme/cookies';
import AddSection from './modals/addSection';
import { getStateName } from './sectionStates';

function Sections(props) {
    const { user, context } = props;

    const [search, setSearch] = useState('');
    const [addClient, setAddClient] = useState(false);

    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [pageSettings, setPageSettings] = useState({
        activePage: 0,
        totalPages: 0,
    });
    const [sections, setSections] = useState([]);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        console.log(user);
        console.log(context);
        setLoading(true);
        axios
            .get(`${API_URL}/sections/all`, {
                headers: {
                    Authorization: 'Bearer ' + getCookie('token'),
                },
            })
            .then((res) => {
                setLoading(false);
                setSections(res.data);
            });

        axios
            .get(`${API_URL}/topic/all`, {
                headers: {
                    Authorization: 'Bearer ' + getCookie('token'),
                },
            })
            .then((res) => {
                setTopics(res.data);
            });
    }, [user, refresh, search, context]);

    const onDelete = (id) => {
        if (window.confirm(`Czy chcesz usunąć sekcję o id: ${id} ?`)) {
            setLoading(true);
            axios
                .delete(`${API_URL}/sections/delete/${id}`, {
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

    const displayTeacherName = (section) => {
        if (section.topic) {
            if (section.topic.teacher) {
                return (
                    section.topic.teacher.firstName +
                    ' ' +
                    section.topic.teacher.lastName
                );
            }
        }

        return '-';
    };

    const displayTopicName = (section) => {
        return section.topic ? section.topic.name : '-';
    };

    return (
        <>
            <Wrapper>
                <ContentHeader>
                    <Title>Wszystkie sekcje</Title>
                </ContentHeader>
                <ContentBody>
                    <FiltersWrapper>
                        <div>
                            {/*<Select label="Kierunek" options={['Informtyka','Elektronika']}/>*/}
                            {/*<Select label="Semestr" options={['1','2','3','4','5']}/>*/}
                            <Search
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div>
                            <Link to="/panel/sections/add-section">
                                <Button>
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                    Dodaj sekcję
                                </Button>
                            </Link>
                        </div>
                    </FiltersWrapper>
                    <ContentTable cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>Numer</th>
                                <th>Nazwa</th>
                                <th>Temat</th>
                                <th>Prowadzący</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            {sections.map((section) => (
                                <tr>
                                    <td>#{section.id}</td>
                                    <td className="name">{section.name}</td>
                                    <td>{displayTopicName(section)}</td>
                                    <td>{displayTeacherName(section)}</td>
                                    <td>{getStateName(section.state)}</td>
                                    <td className="trash">
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() => onDelete(section.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </ContentTable>
                    {loading && <div>Loading ...</div>}
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

            <Route
                path="/panel/sections/add-section"
                component={() => (
                    <AddSection
                        refresh={refresh}
                        setRefresh={setRefresh}
                        context={context}
                        topics={topics}
                    />
                )}
            />
            {/* 
            <Route
                path="/panel/sections/add-section"
                component={() => (
                    <Addsection refresh={refresh} setRefresh={setRefresh} />
                )}
            /> */}
        </>
    );
}

Sections.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        context: state.context.current,
    };
}
export default connect(mapStateToProps)(Sections);

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
