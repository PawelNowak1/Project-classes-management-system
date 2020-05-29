import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {Select as MUSelect} from '@material-ui/core';
import axios from "axios";
import {API_URL} from "../theme/constans";
import {getCookie} from "../theme/cookies";
import {connect} from "react-redux";
import {changeContextFunc} from "../redux/actions";


function SelectContext ({context,dispatch,label,options,displayValue,value,onChange}) {
    const handleChange = (e) => {
        dispatch(changeContextFunc(e.target.value))
    };

    return(
        <>
            {
                context.all.length > 0 && context.current &&
                <Wrapper>
                    <StyledLabel>
                        Semestr:
                    </StyledLabel>
                    <StyledFormControl variant="filled">
                        <MUSelect
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            displayEmpty
                            value={context.current.id}
                            onChange={handleChange}
                        >
                            {
                                context.all.map(option => <StyledMenuItem value={option.id}>
                                    {`${option.course}/${option.year}/${option.semesterNumber}`}
                                </StyledMenuItem>)
                            }
                        </MUSelect>
                    </StyledFormControl>
                </Wrapper>
            }
        </>
    )
};

SelectContext.propTypes = {
};

function mapStateToProps(state) {
    return {
        context:state.context
    };
}
export default connect(mapStateToProps)(SelectContext);

const StyledMenuItem = styled(MenuItem)`
 
`;

const StyledFormControl = styled(FormControl)`
  height: 100%;
  *{
    height: 100%;
    background: none !important;
  }
  .MuiSelect-selectMenu{
    padding: 0px 0px 0 10px;
    margin-right: 35px;
    font-size: ${({theme}) => theme.font.S} !important;
    font-weight: ${({theme}) => theme.font.Regular} !important;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .MuiFilledInput-input{
  
  }
  .MuiFilledInput-root{
    border-radius: 0px !important;
    background: ${({theme}) => theme.fourthColor} !important;
    
  }
  .MuiFilledInput-underline:before,.MuiFilledInput-underline:after{
    display: none;
  }
`;

const StyledLabel = styled.label`
  font-size: ${({theme}) => theme.font.S};
  font-weight: ${({theme}) => theme.font.Light};
  background: ${({theme}) => theme.fourthColor};
  color: ${({theme}) => theme.thirdColor};
  height: 100%;
  padding: 10px 20px;
  padding-right: 0px;
  padding-left: 12px;
`;

const Wrapper = styled.div`
    height: 38px;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 3px;
   overflow: hidden;
`;
