import { useEffect, useState, useCallback } from 'react';
import { CardsAPI } from "@/api";
import { SUITS_ORDER_MAP } from '@/utils';

export const useCards = () => {
    const [cards, setCards] = useState(Array(5).fill(null));
    const [deckId, setDeckId] = useState();

    const handleGetNewDeck = useCallback(async () => {
        const { deck_id } = await CardsAPI.getNewDeck();

        setDeckId(deck_id);
    },[]);

    const handleCardClick = useCallback(async (index) => {
        await CardsAPI.shuffleDeck(deckId);
        const fetchCardRecursively = async () => {
            const { cards: fetchedCards } = await CardsAPI.getCardFromDeck(deckId);

            const prevCards = [ ...cards ];

            if (prevCards.find((card) => card?.code === fetchedCards[0].code)) {
                await fetchCardRecursively();
            } else {
                prevCards[index] = fetchedCards[0];
                setCards(prevCards);
            }
        }

        await fetchCardRecursively();

    }, [cards, deckId]);

    const handleSortCards = useCallback(() => {
        const prevCardsCopy = [...cards];

        prevCardsCopy.sort((a, b) => SUITS_ORDER_MAP[a.value] - SUITS_ORDER_MAP[b.value]);
    
        console.log(prevCardsCopy);

        setCards(prevCardsCopy);
    }, [cards]);

    const reset = useCallback(async () => {
        setCards(Array(5).fill(null));
        setDeckId(undefined);
        await handleGetNewDeck();
    }, [handleGetNewDeck]);

    useEffect(() => {
        handleGetNewDeck();
    }, [handleGetNewDeck]);

    
    const isCardsEnded = !cards.filter((card) => card === null).length;

    useEffect(() => {
        if(isCardsEnded) handleSortCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isCardsEnded]);

    return { cards, handleCardClick, reset, isCardsEnded };
};