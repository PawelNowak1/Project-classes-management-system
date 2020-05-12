import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { connect } from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import { loginUser } from "../../redux/actions";
import Input from "../../components/input";
import Button from "../../components/button";
import Title from "../../components/title";
import LOGO from '../../images/logo.png'
import BACKGROUND from '../../images/background.png'

function Login (props) {
    const { classes,isLoggingIn, loginError, isAuthenticated,dispatch } = props;
    const [state,setState] = useState({
        username:'',
        password:''
    });

    const handleSubmit = () => {
        const { username, password } = state;
        dispatch(loginUser(username, password));
    };

    if (isAuthenticated) {
        return <Redirect to="/panel" />;
    } else {
        return (
            <Wrapper>
                <FormWrapper>
                    <LogoImage src={LOGO}/>
                    <Form>
                        <Title margin="0 0 20px">Logowanie</Title>
                        <Row>
                            <Input label="Username" name="email" value={state.username} onChange={(e) => setState({...state,username:e.target.value})}/>
                        </Row>
                        <Row>
                            <Input type="password" label="Hasło" name="password" value={state.password} onChange={(e) => setState({...state,password:e.target.value})}/>
                        </Row>
                        {
                            loginError &&
                            <p>Error</p>
                        }
                        {
                            isLoggingIn &&
                            <p>Loading ...</p>
                        }

                        <Button big onClick={handleSubmit}>Zaloguj się</Button>

                    </Form>
                    <div/>
                </FormWrapper>
                <ImageWrapper>
                    <img src={BACKGROUND}/>
                </ImageWrapper>
            </Wrapper>
        )
    }
};

Login.propTypes = {
};

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}
export default connect(mapStateToProps)(Login);

const LogoImage = styled.img`
  height: 80px;
  display: block;
  margin: 0 auto;
`;

const Row = styled.div`
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  width: 65%;
  height: 100%;
  
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }
`;

const Form = styled.div`
  width: 350px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 35%;
  height: 100%;
  background: white;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
`;
