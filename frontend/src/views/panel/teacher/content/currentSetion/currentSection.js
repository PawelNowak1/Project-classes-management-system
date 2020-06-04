import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Select from "../../../../../components/select";
import {getStateCode, getStateName, sectionStates} from "../sections/sectionStates";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

function CurrentSection (props) {
    const [section,setSection] = useState({
        status:sectionStates.open
    });

    useEffect(() => {
        //WYSLEMY ZAPYTANIE DO SERWERA I USTAWIMY W SETSECTION()
    },[]);

    return(
        <Wrapper>
            <Header>
                Dypa sekcja
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
                                    getStateName(sectionStates.registered),
                                ]}
                                value={getStateName(section.status)}
                                onChange={(e) => setSection({...section,status:getStateCode(
                                        e.target.value
                                    )})}
                            />
                        </div>
                        <InfoDate>
                            <span>Data:</span>
                            01/04/2020
                        </InfoDate>
                    </InfoSelect>
                    <InfoDesc>
                        <h2>Opis teamtu</h2>

                        <p>W przyszłości tutaj znajdzie się opis tematu, który wprowadzi tutaj wykładowca by przybliżyć studentom zagadnienie. W przyszłości tutaj znajdzie się opis tematu, który wprowadzi tutaj wykładowca by przybliżyć studentom zagadnienie. W przyszłości tutaj znajdzie się opis tematu, który wprowadzi tutaj wykładowca by przybliżyć studentom zagadnienie.</p>

                        <h2>Zadania</h2>

                        <div>
                            <p>1. Tutaj wykładowca może napisać jakie zadania ma wykonać student by lepiej mógł zrozumieć temat lub by sprawdzić wiedze oraz umiejętności studenta na temat tego zagadnienia.</p>
                            <p>2. Tutaj wykładowca może napisać jakie zadania ma wykonać student by lepiej mógł zrozumieć temat lub by sprawdzić wiedze i umiejętności studenta na temat tego zagadnienia.  </p>
                        </div>

                        <h2>Załączniki</h2>

                        <div>
                            <ul>
                                <li>sxxwxsxw</li>
                                <li>sxxwxsxw</li>
                                <li>sxxwxsxw</li>
                            </ul>
                        </div>
                    </InfoDesc>
                    <ContentTable cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr>
                            <th>Imię i nazwisko</th>
                            <th>Załączniki</th>
                            <th>Komentarz do załącznika</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                            <tr>
                                <td className="name">
                                  Adam Wolny
                                </td>
                                <TdLinks>
                                    <a href="">swxswxwsxwsxw.pdf</a>
                                    <a href="">swxswxwsxwsxw.pdf</a>
                                </TdLinks>
                                <Td>
                                    <p>wsxxwsxwsxw</p>
                                    <p>wsxxwsxwsxw</p>
                                </Td>
                                <Td>
                                    <p>wsxxwsxwsxw</p>
                                    <p>wsxxwsxwsxw</p>
                                </Td>
                                <td className="trash">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        // onClick={() =>
                                        //     onDelete(section.id)
                                        // }
                                    />
                                </td>
                            </tr>
                        <tr>
                            <td className="name">
                                Adam Wolny
                            </td>
                            <TdLinks>
                                <a href="">swxswxwsxwsxw.pdf</a>
                                <a href="">swxswxwsxwsxw.pdf</a>
                            </TdLinks>
                            <Td>
                                <p>wsxxwsxwsxw</p>
                                <p>wsxxwsxwsxw</p>
                            </Td>
                            <Td>
                                <p>wsxxwsxwsxw</p>
                                <p>wsxxwsxwsxw</p>
                            </Td>
                            <td className="trash">
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    // onClick={() =>
                                    //     onDelete(section.id)
                                    // }
                                />
                            </td>
                        </tr>
                        </tbody>
                    </ContentTable>
                </InfoBody>
            </Content>
        </Wrapper>
    )
};

CurrentSection.propTypes = {
};

const Td = styled.td`
  p{
    margin: 5px;
  }
`;

const TdLinks = styled.td`
  a{
    display: block;
    margin: 5px;
  }
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

const InfoDesc = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-gap: 20px;
  margin-top: 30px;
  h2{
  color: ${({theme}) => theme.secondColor};
      font-size: ${({theme}) => theme.font.M};
   font-weight: ${({theme}) => theme.font.Bold};
   margin: 0px;
  }
  p{
   color: ${({theme}) => theme.thirdColor};
   font-size: ${({theme}) => theme.font.S};
   font-weight: ${({theme}) => theme.font.Light};
   margin: 0px;
   margin-bottom: 10px;
   &:last-of-type{
    margin-bottom: 0px;
   }
  }
  ul,li{
   margin: 0px !important;
   list-style: none;
   padding: 0px;
    color: ${({theme}) => theme.thirdColor};
     font-size: ${({theme}) => theme.font.S};
   font-weight: ${({theme}) => theme.font.Light};
  }
`;

const InfoDate = styled.div`
  font-size: ${({theme}) => theme.font.M};
  font-weight: ${({theme}) => theme.font.Light};
  color: ${({theme}) => theme.thirdColor};
  span{
    color: ${({theme}) => theme.secondColor};
     font-weight: ${({theme}) => theme.font.Bold};
     margin-right: 10px;
  }
`;

const InfoSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoBody = styled.div`

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

export default CurrentSection;