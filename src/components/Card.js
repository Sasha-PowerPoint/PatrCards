import Image from "next/image";
import { useState, useEffect } from 'react';

export const Card = ({ card, onClick}) => {
    const [localState, setLocalState] = useState(null);

    useEffect(() => {
        if(card) {
            setLocalState(card);
        } else {
            setTimeout(() => {
                setLocalState(null);
            }, 300);
        }
    },[card]);

    return (
        <div className={`perspective-1000 ${!card ? "cursor-pointer" : 'pointer-events-none'}`} onClick={onClick}>
            <div className={`w-[226px] h-[314px] relative transition-transform duration-300 origin-center ${card ? 'rotate-y-180' : ''}`} style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute backface-hidden w-full h-full">
                    <Image
                        src="https://www.deckofcardsapi.com/static/img/back.png"
                        width={226}
                        height={314}
                        alt="Card"
                    />     
                </div>
                <div className="absolute backface-hidden rotate-y-180 origin-center w-full h-full">
                    <Image
                        style={{objectFit: "none"}}
                        src={localState?.images?.svg}
                        width={226}
                        height={314}
                        alt="Card"
                    />  
                </div>
            </div>
        </div>     
    );
};