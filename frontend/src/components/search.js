import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

function Search (props) {
    return(
        <Wrapper>
            <FontAwesomeIcon icon={faSearch}/>
            <Input placeholder="Imię / Nazwisko / Numer studenta" value={props.value} onChange={props.onChange}/>
        </Wrapper>
    )
};

Search.propTypes = {
};

export default Search;

const Wrapper = styled.div`
  position: relative;
  >svg{
    position: absolute;
    left: 15px;
    height: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Input = styled.input`
    border:none;
    padding: 0px 35px 0 10px;
    font-size: ${({theme}) => theme.font.S} !important;
    font-weight: ${({theme}) => theme.font.Light} !important;
    background: ${({theme}) => theme.fourthColor} !important;
    height: 38px;
    border-radius: 3px;
    padding-left: 40px;
    width: 400px;
    &:focus {outline:0;}
`;
