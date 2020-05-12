import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { connect } from "react-redux";

function Dashboard (props) {
    const { dispatch,user } = props;

    return(
        <Wrapper>
            {props.children}
        </Wrapper>
    )
};

Dashboard.propTypes = {
};

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user:state.auth.user
    };
}
export default connect(mapStateToProps)(Dashboard);

const StyledSignOut = styled.button`
  font-size: ${({theme}) => theme.font.XL};
  background: none;
  border: none;
   color: ${({theme}) => theme.secondColor};
   margin-left: 10px;
   margin-right: 10px;
`;

const Image = styled.div`
  background: ${({theme}) => theme.thirdColor};
  color: ${({theme}) => theme.secondColor};
  font-size: ${({theme}) => theme.font.S};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 35px;
  width: 35px;
`;

const UserWrapper = styled.div`
  
`;

const ContentHeader = styled.div`
  background: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ContentWrapper = styled.div`
  //display: grid;
  //grid-template-rows: 60px auto;
  //grid-template-columns: 1fr;
  flex: 1 1;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
