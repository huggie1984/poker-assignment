import { getTieBreakerWinner } from './getTieBreakerWinner';

export type Hand = string[];
export type Winner = {
  winner: 1 | 2 | 0;
  text: string;
};

const suits = ['C', 'D', 'H', 'S'];
export const GetWinner = {
  ROYAL_FLUSH: { name: 'ROYAL FLUSH', rank: 10 },
  STRAIGHT_FLUSH: { name: 'STRAIGHT FLUSH', rank: 9 },
  FOUR_OF_A_KIND: { name: 'FOUR OF A KIND', rank: 8 },
  FULL_HOUSE: { name: 'FULL HOUSE', rank: 7 },
  FLUSH: { name: 'FLUSH', rank: 6 },
  STRAIGHT: { name: 'STRAIGHT', rank: 5 },
  THREE_OF_A_KIND: { name: 'THREE OF A KIND', rank: 4 },
  TWO_PAIR: { name: 'TWO PAIR', rank: 3 },
  PAIR: { name: 'PAIR', rank: 2 },
  NADA: { name: 'HIGH CARD', rank: 1 },
};

function hasAKind(hand: Hand) {
  const valueCounts: { [key: string]: number } = {};
  for (const card of hand) {
    const value = card
      .replace(new RegExp(suits.join('|'), 'g'), '')
      .replace('T', '10');
    valueCounts[value] = (valueCounts[value] || 0) + 1;
  }
  return Object.values(valueCounts);
}

function hasFourOfAKind(hand: Hand) {
  return hasAKind(hand).includes(4);
}

function hasFullHouse(hand: Hand) {
  const values = hasAKind(hand);
  return values.includes(3) && values.includes(2);
}

function hasThreeOfAKind(hand: Hand) {
  return hasAKind(hand).includes(3);
}

function hasTwoPair(hand: Hand) {
  const values = hasAKind(hand);
  let count = 0;
  for (const number of values) {
    if (number === 2) {
      count++;
    }
  }
  return count === 2;
}

function hasPair(hand: Hand) {
  const values = hasAKind(hand);
  return values.includes(2);
}

function hasRoyalFlush(hand: Hand) {
  const royalValues = ['T', 'J', 'Q', 'K', 'A'];
  for (const suit of suits) {
    const suitCards = hand.filter((card) => card.endsWith(suit));
    if (suitCards.length >= 5) {
      const royalFlush = royalValues.every((value) =>
        suitCards.includes(value + suit)
      );
      if (royalFlush) {
        return true;
      }
    }
  }
  return false;
}

function hasStraightFlush(hand: Hand) {
  return hasFlush(hand) && hasStraight(hand);
}

function hasFlush(hand: Hand) {
  for (const suit of suits) {
    const suitCards = hand.filter((card) => card.endsWith(suit));
    if (suitCards.length >= 5) {
      return true;
    }
  }
  return false;
}

function hasStraight(hand: Hand) {
  const valueMap: { [key: string]: number } = {
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    J: 0,
    Q: 0,
    K: 0,
    A: 0,
  };

  for (const card of hand) {
    const value = card.slice(0, -1).replace('T', '10');
    valueMap[value]++;
  }

  let consecutiveCount = 0;

  for (const value in valueMap) {
    if (valueMap[value] > 0) {
      consecutiveCount++;
      if (consecutiveCount === 5) {
        return true;
      }
    } else {
      consecutiveCount = 0;
    }
  }

  return false;
}

function checkHand(hand: Hand) {
  switch (true) {
    case hasRoyalFlush(hand):
      return GetWinner.ROYAL_FLUSH;
    case hasStraightFlush(hand):
      return GetWinner.STRAIGHT_FLUSH;
    case hasFourOfAKind(hand):
      return GetWinner.FOUR_OF_A_KIND;
    case hasFullHouse(hand):
      return GetWinner.FULL_HOUSE;
    case hasFlush(hand):
      return GetWinner.FLUSH;
    case hasStraight(hand):
      return GetWinner.STRAIGHT;
    case hasThreeOfAKind(hand):
      return GetWinner.THREE_OF_A_KIND;
    case hasTwoPair(hand):
      return GetWinner.TWO_PAIR;
    case hasPair(hand):
      return GetWinner.PAIR;
    default:
      return GetWinner.NADA;
  }
}

export function getWinner(playerOneHand: any, playerTwoHand: any): Winner {
  const playerOneResult = checkHand(playerOneHand);
  const playerTwoResult = checkHand(playerTwoHand);
  if (playerOneResult.rank > playerTwoResult.rank) {
    return {
      text: `Player ONE wins, ${playerOneResult.name}`,
      winner: 1,
    };
  } else if (playerTwoResult.rank > playerOneResult.rank) {
    return {
      text: `Player TWO wins, ${playerTwoResult.name}`,
      winner: 2,
    };
  } else {
    return getTieBreakerWinner(
      playerOneHand,
      playerTwoHand,
      playerOneResult.name
    );
  }
}
