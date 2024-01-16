import React, { useState ,useEffect} from 'react';
import styled from "styled-components";
import DesCard from './DesCard';

const FloorDes=styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    *{box-sizing: border-box;}
    >h2{
        font-weight: 700;
    }
`
const FloorTop=styled.div`
    width: 390px;
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    align-items: center;
    transition: all 2s;
    >div{
            width: 120px;
            height: 170px;
            overflow: hidden;
            transition: all 2s ease-in-out;

            div{
                position: relative;
                width: 120px;
                height: 170px;
                transition: all 2s ease;
                &.hidden {
                    display: none;
                    opacity: 0;
                }
            }                   
            img{
                width: 120px;
                height: 170px;
            }
    }
           
`
const FloorButtons=styled.div`
    display:flex;
    height: 200px;
    justify-content: space-evenly;
    flex-direction: column;
    padding:25px 0px;
    >div{
        display: flex;
        gap: 10px;
        font-weight: 800;
    }
`
const FloorButton = styled.button`
    background-color:#C3E2C2;
    width: 120px;
    height: 25px;
    font-size: 13px;
    font-weight: 700;
    line-height:21px;
    text-align: center;
    border-radius: 5px;
    border: gray 2px solid;
    
    cursor: pointer;
    &:hover{
        background-color:#D9D9D9;
        color: white;
    }
`
const Description = styled.div`
    background-color: #D9D9D9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    width: 330px;
    height:330px;
    border-radius: 10px;
    span{
        font-size: 10px;
        text-align: left;
        font-weight: 600;
    }
`
const FloorDescription = () => {
    const [beforeFloor,setBeforeFloor]= useState('0f.png');
    const [floor,setFloor] = useState('0');
    const des=['23석의 주차자리를 가지고 있습니다',
            '안내를 받을수있는 안내데스크와 프라이빗한 룸을 가지고 있습니다. 음식주문또한 가능하고 배달음식 시켜드셔도 좋습니다 재밌게 즐겨보세요',
            '개방형 연습타석과 커피머신 무료음료 100개의 락커를 가지고 있습니다',
            '',
            '스크린이 끝나셨다면 뒤풀이 후토크 대기중이시라면 간단하게 아이스브레이킹 그냥 오셔서 이용하셔도 됩니다'
    ]
    useEffect(() => {
        const beforeEle = document.getElementsByClassName(`${beforeFloor}f`);
        if (beforeEle.length > 0) {
            beforeEle[0].classList.add('hidden');
            beforeEle[1].classList.add('hidden');
        }

        const elements = document.getElementsByClassName(`${floor.slice(0,1)}f`);
            if (elements.length > 0) {
                elements[0].classList.remove('hidden');
                elements[1].classList.remove('hidden');
            }
    }, [floor,beforeFloor]);
    const handelFloor = (changeFloor) =>{
        setBeforeFloor(floor.slice(0,1));
        setFloor(changeFloor)
    }
    return (
        <FloorDes>
            <FloorTop>
                <div>
                    <div className='hidden 5f'><img className='hidden 5f' src={`/assets/5f.png`} alt="5층" /></div>                     
                    <div className='hidden 3f'><img className='hidden 3f' src={`/assets/3f.png`} alt="3층" /></div>                     
                    <div className='hidden 2f'><img className='hidden 2f' src={`/assets/2f.png`} alt="2층" /></div>                     
                    <div className='hidden 1f'><img className='hidden 1f' src={`/assets/1f.png`} alt="1층" /></div>
                    <div className='hidden 0f'><img className='hidden 0f' src={`/assets/0f.png`} alt="전체" /></div>  
                </div>                                     
                <FloorButtons> 
                    <div><span>5F</span><FloorButton onClick={()=>handelFloor('5f.png')}>프렌즈 비어</FloorButton></div>
                    <div><span>3F</span><FloorButton onClick={()=>handelFloor('3f.png')}>연습타석</FloorButton></div>
                    <div><span>2F</span><FloorButton onClick={()=>handelFloor('2f.png')}>INFO / 룸</FloorButton></div>
                    <div><span>1F</span><FloorButton onClick={()=>handelFloor('1f.png')}>주차장</FloorButton></div>
                </FloorButtons>
            </FloorTop>
            {floor.slice(0,1)!=="0"?<h2>{floor.slice(0,1)}F</h2>:<></>}
            {floor.slice(0,1)!=="0"?
            <Description>
                <DesCard floor={floor.slice(0,1)} />
                <span>{des[floor.slice(0,1)-1]}</span>
            </Description>:
            <></>
            }
        </FloorDes>
    );
};

export default FloorDescription;