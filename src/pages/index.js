import { Card } from '@/components';
import { useCards } from '@/hooks';
import { useCallback } from 'react';

export default function Home() {
  const { cards, handleCardClick, isCardsEnded, reset } = useCards();

  const handleEmptyCardClick = useCallback((index) => () =>{
    handleCardClick(index);
  },[handleCardClick]);

  return (
    <div className="w-min mx-auto py-20 flex flex-col items-center gap-20">
      <div className="flex gap-4 justify-between">
        {cards.map((card, index) => <Card key={index} card={card} onClick={handleEmptyCardClick(index)}/>)}
      </div>
      {isCardsEnded && <button className='text-3xl w-min' onClick={reset}>Reset</button>}
   </div>
  );
}
