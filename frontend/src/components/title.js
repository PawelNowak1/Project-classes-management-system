
import styled, {css} from 'styled-components'

const Title = styled.h2`
  margin: ${({margin}) => margin || '0px'};
  font-size: ${({theme}) => theme.font.XLL};
  color: ${({theme}) => theme.secondColor};
  font-weight: 800;
  display: flex;
   align-items: center;

  svg{
    margin-right:  10px !important;
  }
  ${({secondary}) => secondary && css`
    font-size: ${({theme}) => theme.font.L};
  `}
 
`;

export default Title;