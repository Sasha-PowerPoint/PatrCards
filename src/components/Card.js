import Image from "next/image";
import { useState, useEffect } from 'react';

export const Card = ({ index, card, onClick}) => {
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
        <div className={`perspective-1000 ${!card ? "cursor-pointer" : 'pointer-events-none'}`} onClick={onClick} data-index={index}>
            <div className={`w-[226px] h-[314px] relative transition-transform duration-300 origin-center transformStyle-preserve ${card ? 'rotate-y-180' : ''}`}>
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