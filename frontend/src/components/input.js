import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';

function Input (props) {
    return(
        <Wrapper>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" {...props}/>
        </Wrapper>
    )
};

Input.propTypes = {
};

export default Input;

const Wrapper = styled.div`
 .MuiFormControl-root{
   width: 100%;
 }
  .MuiOutlinedInput-input{
    padding: 12px 18px;
   
  }
  .MuiInputLabel-outlined{
    transform: translate(14px, 15px) scale(1);
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
    border-color:${({theme}) => theme.primaryColor};
  }
    
`;
