const httpClient = async (url, options) => {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${url}`, options);
    return response.json();
};

const getNewDeck = () => httpClient('new/shuffle/?deck_count=1');

const shuffleDeck = (deckId) => httpClient(`${deckId}/shuffle/`);

const getCardFromDeck = (deckId) => httpClient(`${deckId}/draw/?count=1`);


export { getNewDeck, shuffleDeck, getCardFromDeck };