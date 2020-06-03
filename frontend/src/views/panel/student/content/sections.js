import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

function Sections () {
    //HOOKI
    const array = [2,3,4,5,6];
    const array2 = [
        {
            id:1,
            name:'a'
        },
        {
            id:2,
            name:'b'
        },
        {
            id:3,
            name:'c'
        }
    ];
    //USEEFFECT


    return(
        <>
            <Wrapper>
                <P>swxswxwsxsxw</P>
            </Wrapper>
        </>
    )
};

Sections.propTypes = {
};

export default Sections;

const Wrapper = styled.div`
  background-color: green;
`;

const P = styled.p`
  font-size: 100px;
`;
