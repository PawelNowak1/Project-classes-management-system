import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LOGO from '../../../../images/logo.png';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileContract,
    faHeadset,
    faPlus,
    faPlusCircle,
    faSignOutAlt,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../../../../redux/actions';
import SelectContext from '../../../../components/selectContext';

function Navigation({ dispatch }) {
    return (
        <Wrapper>
            <div>
                <Logo>
                    <img src={LOGO} />
                </Logo>
                <NavLinksWrapper>
                    <SelectContext />
                    <StyledNavLink exact to="/panel/sections">
                        <FontAwesomeIcon icon={faUsers} /> Moje sekcje
                    </StyledNavLink>
                    {/*<StyledNavLink exact to="/panel/sections">*/}
                    {/*    <FontAwesomeIcon icon={faUsers} /> Wszystkie sekcje*/}
                    {/*</StyledNavLink> */}
                </NavLinksWrapper>
            </div>
            <StyledLogout onClick={() => dispatch(logoutUser())}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj się
            </StyledLogout>
        </Wrapper>
    );
}

Navigation.propTypes = {};

export default Navigation;

const StyledLogout = styled.button`
 display: block;
  width: 90%;
  margin: 0 auto;
  padding: 8px;
  padding-left: 20px;
  border-radius: 5px;
  // background: ${({ theme }) => theme.primaryBackground};
  color: ${({ theme }) => theme.thirdColor};
  font-size: ${({ theme }) => theme.font.M};
  font-weight: ${({ theme }) => theme.font.Regular};
  position: relative;
  margin-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
  
  svg{
    min-width: 25px;
    margin-right: 10px;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  width: 90%;
  margin: 0 auto;
  padding: 8px;
  padding-left: 20px;
  border-radius: 5px;
  // background: ${({ theme }) => theme.primaryBackground};
  color: ${({ theme }) => theme.thirdColor};
  font-size: ${({ theme }) => theme.font.M};
  font-weight: ${({ theme }) => theme.font.Regular};
  position: relative;
  margin-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;
  
  svg{
    min-width: 25px;
    margin-right: 10px;
  }
  a{
    font-size: 13px;
    background: ${({ theme }) => theme.primaryColor};
    color: white;
    display: block;
    height: 22px;
    width: 25px;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    
    svg{
    width: 13px;
    height: 13px;
    margin: 0px;
    }
  }
  &:hover{
     color:${({ theme }) => theme.secondColor};
  }
  
  &.active{
    background: ${({ theme }) => theme.primaryBackground};
    color:${({ theme }) => theme.primaryColor};
  }
  
`;

const NavLinksWrapper = styled.div``;

const Logo = styled.div`
    margin-top: 40px;
    padding: 0 20px;
    margin-bottom: 40px;
    img {
        max-height: 50px;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const Wrapper = styled.div`
    background: white;
    height: 100%;
    min-width: 300px;
    max-width: 300px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-bottom: 20px;
`;
