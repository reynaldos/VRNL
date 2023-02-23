import React from 'react';
import styled from 'styled-components';
import { LoadingIcon} from './LoadingIcon';

export const Loading = () => {
  return (
    <Container>
        <Wrapper>
            <IconWrap>
                <LoadingIcon/>
            </IconWrap>
        </Wrapper>
    </Container>
  )
}


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 50;
    background-color: rgba(0,0,0,.75);

`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;

`
const IconWrap = styled.div`

`

