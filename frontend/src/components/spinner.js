import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

function Spinner ({white,width,height,borderWidth}) {
    return(
        <>
            <StyledSpinner white={white} width={width} height={height} borderWidth={borderWidth}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </StyledSpinner>
        </>
    )
};

Spinner.propTypes = {
};

const StyledSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: ${({width}) => width || '30'}px;
  height: ${({height}) => height || '30'}px;
  div{
    box-sizing: border-box;
      display: block;
      position: absolute;
      width: ${({width}) => width || '30'}px;
      height: ${({height}) => height || '30'}px;
      margin: 0px;
      border: ${({borderWidth}) => borderWidth || '4'}px solid ${({theme,white}) => white ? '#FFFFFF' : theme.primaryColor};
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${({theme,white}) => white ? '#FFFFFF' : theme.primaryColor} transparent transparent transparent;
      &:nth-child(1){
       animation-delay: -0.45s;
      }
    &:nth-child(1){
        animation-delay: -0.3s;
      }
    &:nth-child(1){
       animation-delay: -0.15s;
      }
      
  @keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  }
`;

export default Spinner;