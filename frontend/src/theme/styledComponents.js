import styled, {css} from 'styled-components'

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: ${({gtc}) => gtc || '1fr 1fr'};
  margin: ${({margin}) => margin || '0 0 10px'};
  grid-gap: 20px;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: ${({jc}) => jc || 'flex-start'};
  align-items: ${({ai}) => ai || 'center'};
`;

export const DrawerContent = styled.div`
  background: white;
  padding: 20px;
  width: 90%;
  max-width: ${({maxWidth}) => maxWidth || '800px'};
  margin: 0 auto;
  margin-top: 90px;
  border-radius: 5px;
   height: 100vh;
    right: 0px;
    top: 0px;
    position: absolute;
    margin-top: 0px;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 90%;
  max-width: ${({maxWidth}) => maxWidth || '800px'};
  margin: 0 auto;
  margin-top: 70px;
  border-radius: 5px;
  max-height: calc(100vh - 70px - 70px);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  
  >div:first-of-type{
    background: white;
    z-index: 2;
  }
  >div:nth-child(2){
    flex: 1 1;
    overflow: scroll;
  }
  >h2{
    margin-bottom: 15px;
  }
`;

export const ModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: rgba(0,0,0,0.4);
  z-index: -1;
  opacity: 0;
    
    &.show{
      animation: showModal 0.1s forwards;
    }
    &.hide{
        animation: hideModal 0.1s forwards;
    }
`;

export const StyledErrorMessage = styled.div`
  width: 100%;
  padding: 10px;
  color: ${({theme}) => theme.red};
  font-size: ${({theme}) => theme.font.XS};
  margin-bottom: 20px;
  margin-top: 20px;
  font-weight: 700;
  background: ${({theme}) => theme.redBackground};
  border-radius: 5px;
`;