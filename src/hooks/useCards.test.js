import { renderHook, act, waitFor } from '@testing-library/react'
import { useCards } from './useCards';
import { CardsAPI } from '../api';

const cardsResponse= () => ({ cards: [{ value: '1', code: new Date().valueOf()}] });
const deckReponse = { deck_id: "qwfgwe[pgfkwe[gp" }

jest.mock('../api', () => ({
    "CardsAPI": {
        getNewDeck: jest.fn().mockImplementation(() => {
            return Promise.resolve(deckReponse)
          }),
          getCardFromDeck: jest.fn().mockImplementation(() => {
            return Promise.resolve(cardsResponse())
          }),
          shuffleDeck: jest.fn().mockImplementation(() => {
            return Promise.resolve({ success: true })
          })
    }
}));

test('should return default values', () => {
  const { result } = renderHook(() => useCards())

  expect(result.current.cards).toStrictEqual(Array(5).fill(null));
  expect(result.current.isCardsEnded).toBe(false);
  
})

test('should set new value to a state', async () => {
    const { result } = renderHook(() => useCards())

    await act(async () => {
        await result.current.handleCardClick(0);
    });

    await waitFor(() => {
        expect(!!result.current.cards[0]).toBe(!!cardsResponse().cards[0]);
        expect(result.current.isCardsEnded).toBe(false);
        expect(CardsAPI.shuffleDeck).toHaveBeenCalled()
    })
    
})

test('should set isCardsEnded to true, should clear after resetting', async () => {
    const { result } = renderHook(() => useCards())

    await act(async () => {
        await result.current.handleCardClick(0);
    });

    await waitFor(() => {
        expect(!!result.current.cards[0]).toBe(true);
    })

    await act(async () => {
        await result.current.handleCardClick(1);
    });

    await waitFor(() => {
        expect(!!result.current.cards[1]).toBe(true);
    })

    await act(async () => {
        await result.current.handleCardClick(2);
    });

    await waitFor(() => {
        expect(!!result.current.cards[2]).toBe(true);
    })

    await act(async () => {
        await result.current.handleCardClick(3);
    });

    await waitFor(() => {
        expect(!!result.current.cards[3]).toBe(true);
    })

    await act(async () => {
        await result.current.handleCardClick(4);
    });

    await waitFor(() => {
        expect(!!result.current.cards[4]).toBe(true);
    })

    await waitFor(() => {
        expect(result.current.isCardsEnded).toBe(true);
    })

    ///////////////////////////////////////////////////

    await act(async () => {
        await result.current.reset();
    });
  
    expect(result.current.cards).toStrictEqual(Array(5).fill(null));
    expect(result.current.isCardsEnded).toBe(false);
  })
