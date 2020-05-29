import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Select as MUSelect } from '@material-ui/core';

function Select({ label, options, onChange }) {
    return (
        <Wrapper>
            <StyledLabel>{label}:</StyledLabel>
            <StyledFormControl variant="filled">
                <MUSelect
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    displayEmpty
                    value={''}
                    onChange={onChange}
                >
                    {/*<MenuItem value="">*/}
                    {/*    <em>None</em>*/}
                    {/*</MenuItem>*/}
                    {/*<MenuItem value="" disabled>*/}
                    {/*    Dowolne*/}
                    {/*</MenuItem>*/}
                    {options.map((option) => (
                        <StyledMenuItem value={option}>{option}</StyledMenuItem>
                    ))}
                </MUSelect>
            </StyledFormControl>
        </Wrapper>
    );
}

Select.propTypes = {};

export default Select;

const StyledMenuItem = styled(MenuItem)``;

const StyledFormControl = styled(FormControl)`
    height: 100%;
    * {
        height: 100%;
        background: none !important;
    }
    .MuiSelect-selectMenu {
        padding: 0px 35px 0 10px;
        font-size: ${({ theme }) => theme.font.S} !important;
        font-weight: ${({ theme }) => theme.font.Regular} !important;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .MuiFilledInput-input {
    }
    .MuiFilledInput-root {
        border-radius: 0px !important;
        background: ${({ theme }) => theme.fourthColor} !important;
    }
    .MuiFilledInput-underline:before,
    .MuiFilledInput-underline:after {
        display: none;
    }
`;

const StyledLabel = styled.label`
    font-size: ${({ theme }) => theme.font.S};
    font-weight: ${({ theme }) => theme.font.Light};
    background: ${({ theme }) => theme.fourthColor};
    color: ${({ theme }) => theme.thirdColor};
    height: 100%;
    padding: 10px 20px;
    padding-right: 0px;
    padding-left: 12px;
`;

const Wrapper = styled.div`
    height: 38px;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    overflow: hidden;
`;
