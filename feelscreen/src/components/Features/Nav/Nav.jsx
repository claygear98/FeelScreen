import React from 'react';
import styled from 'styled-components';
import { FaHome } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { TbGolf } from "react-icons/tb";
import { LuUser2 } from "react-icons/lu";
import { useNavigate ,useLocation } from 'react-router-dom';

const Wrapper=styled.div`
    *{box-sizing:border-box}
    width: 100%;
`
const Navbar=styled.div`
    display:flex;
    width: 100%;
    box-shadow: 0px -3px 3px 1px rgba(104, 104, 104, 0.5); 

    div{
        width: 25%;
        height: 80px;
        text-align: center;
        line-height: 80px;
        cursor: pointer;
        #Home{
            color:#4ECB71;
            width: 30px;
            height: 30px;
        }
        #Notice{
            color:#4ECB71;
            width: 30px;
            height: 30px;
        }
        #Fillsta{
            color:#4ECB71;
            width: 30px;
            height: 30px;
        }
        #Mypage{
            color:#4ECB71;
            width: 30px;
            height: 30px;
        }
    }
`

const Nav = () => {
    const location=useLocation();
    
    const navigate = useNavigate()
    const handleNavigae=(navi)=>{
        navigate(navi);
    }
    return (
        <Wrapper>
            <Navbar>
                <div style={location.pathname==='/'?{backgroundColor:'#4ECB71'}:{}}  onClick={()=>handleNavigae('/')} >
                    <FaHome style={location.pathname==='/'?{color:'#d8f7e0'}:{}} id='Home'/>
                </div>
                <div  style={location.pathname==='/notice'?{backgroundColor:'#4ECB71'}:{}}  onClick={()=>handleNavigae('/notice')}>
                    <HiOutlineSpeakerphone style={location.pathname==='/notice'?{color:'#d8f7e0'}:{}} id='Notice'  />
                </div>
                <div  style={location.pathname==='/fillstagram'?{backgroundColor:'#4ECB71'}:{}}  onClick={()=>handleNavigae('/fillstagram')}>
                    <TbGolf style={location.pathname==='/fillstagram'?{color:'#d8f7e0'}:{}} id='Fillsta' />
                </div>
                <div  style={location.pathname==='/mypage'?{backgroundColor:'#4ECB71'}:{}}  onClick={()=>handleNavigae('/mypage')}>
                    <LuUser2 style={location.pathname==='/mypage'?{color:'#d8f7e0'}:{}} id='Mypage' />
                </div>
            </Navbar>
        </Wrapper>
    );
};

export default Nav;