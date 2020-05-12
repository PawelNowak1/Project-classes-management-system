
import styled, {css} from 'styled-components'

const SubTitle = styled.h4`
  margin: 0px;
  font-size: ${({theme}) => theme.font.S};
  margin: ${({margin}) => margin || '20px 0 10px'};
  color: rgba(0,0,0,0.6);
  font-weight: ${({theme}) => theme.font.Regular};
`;

export default SubTitle;