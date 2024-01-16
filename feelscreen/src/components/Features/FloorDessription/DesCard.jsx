import React, { useState ,useEffect} from 'react';
import styled from 'styled-components';
const DescriptionCard = styled.div`
    width: 300px;
    height: 250px;
    
    >img{
        width: 300px;
        height: 250px;
    }
`
const DesCard = (props) => {
    const {floor}=props;
    const [pictureNum,setPictureNum]=useState(1);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (pictureNum === 3) {
                setPictureNum(1);
            } else {
                setPictureNum(pictureNum + 1);
            }
        }, 2500);

        return () => clearInterval(intervalId);
    }, [pictureNum]);
    return (
        <DescriptionCard>
            <img src={`/assets/images/${floor}f${pictureNum}.jpg`} alt="" />
        </DescriptionCard>
    );
};

export default DesCard;