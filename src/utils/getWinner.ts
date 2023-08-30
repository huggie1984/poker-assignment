import { handleTieBreaker } from './tieBreaker';

export type Hand = string[];
export type Winner = {
  winner: 1 | 2 | 0;
  text: string;
};

const suits = ['C', 'D', 'H', 'S'];
export const WINS = {
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

export function hasFourOfAKind(hand: Hand) {
  return hasAKind(hand).includes(4);
}

export function hasFullHouse(hand: Hand) {
  const values = hasAKind(hand);
  return values.includes(3) && values.includes(2);
}

export function hasThreeOfAKind(hand: Hand) {
  return hasAKind(hand).includes(3);
}

export function hasTwoPair(hand: Hand) {
  const values = hasAKind(hand);
  let count = 0;
  for (const number of values) {
    if (number === 2) {
      count++;
    }
  }
  return count === 2;
}

export function hasPair(hand: Hand) {
  const values = hasAKind(hand);
  return values.includes(2);
}

export function hasRoyalFlush(hand: Hand) {
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

export function hasStraightFlush(hand: Hand) {
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

export function checkHand(hand: Hand) {
  switch (true) {
    case hasRoyalFlush(hand):
      return WINS.ROYAL_FLUSH;
    case hasStraightFlush(hand):
      return WINS.STRAIGHT_FLUSH;
    case hasFourOfAKind(hand):
      return WINS.FOUR_OF_A_KIND;
    case hasFullHouse(hand):
      return WINS.FULL_HOUSE;
    case hasFlush(hand):
      return WINS.FLUSH;
    case hasStraight(hand):
      return WINS.STRAIGHT;
    case hasThreeOfAKind(hand):
      return WINS.THREE_OF_A_KIND;
    case hasTwoPair(hand):
      return WINS.TWO_PAIR;
    case hasPair(hand):
      return WINS.PAIR;
    default:
      return WINS.NADA;
  }
}

export function compareHands(playerOneHand: any, playerTwoHand: any): Winner {
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
    return handleTieBreaker(playerOneHand, playerTwoHand, playerOneResult.name);
  }
}
