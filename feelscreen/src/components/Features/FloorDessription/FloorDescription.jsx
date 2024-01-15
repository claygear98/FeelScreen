import React, { useState } from 'react';
import styled from "styled-components";

const FloorDes=styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    *{box-sizing: border-box;}
`
const FloorTop=styled.div`
    width: 390px;
    padding-right: 20px;
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    align-items: center;
    >img{
        width: 180px;
        height: 250px;
    }
`
const FloorButtons=styled.div`
    display:flex;
    height: 270px;
    justify-content: space-evenly;
    flex-direction: column;
    padding:25px 0px;
`
const FloorButton = styled.div`
    background-color:#C3E2C2;
    width: 150px;
    height: 30px;
    font-size: 15px;
    font-weight: 700;
    line-height:30px;
    text-align: center;
    border-radius: 5px;
`
const Description = styled.div`
    background-color: #D9D9D9;
    width: 330px;
    height:240px;
`
const FloorDescription = () => {
    const [floor,setFloor] = useState('feel_view.png');
    return (
        <FloorDes>
            <FloorTop>                
                <img src={`/assets/${floor}`} alt="현재층" />                
                <FloorButtons> 
                    <FloorButton onClick={()=>setFloor('feel_5floor.png')}>5층 프렌즈 비어</FloorButton>
                    <FloorButton onClick={()=>setFloor('feel_3floor.png')}>3층 연습타석 / 룸</FloorButton>
                    <FloorButton onClick={()=>setFloor('feel_2floor.png')}>2층 안내데스크 / 룸</FloorButton>
                    <FloorButton onClick={()=>setFloor('feel_1floor.png')}>1층 주차장</FloorButton>
                </FloorButtons>
            </FloorTop>
            <Description>
                <h1>{floor.slice(5,6)}층</h1>
                <div>
                    <img src="" alt="" />
                </div>
            </Description>
        </FloorDes>
    );
};

export default FloorDescription;