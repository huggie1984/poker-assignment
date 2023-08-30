import { Hand, Winner, WINS } from './wins';

function getRankValue(rank: string) {
  const ranks = '2345678910JQKA';
  return ranks.indexOf(rank) + 2;
}

function getRankCount(hand: Hand) {
  const rankCount: { [key: string]: number } = {};
  // Count the occurrences of each rank
  hand.forEach((card) => {
    const rank = card[0];
    if (!rankCount[rank]) {
      rankCount[rank] = 1;
    } else {
      rankCount[rank]++;
    }
  });
  return rankCount;
}

function getHigherOfAKindValue(hand: Hand, count: number) {
  const rankCount = getRankCount(hand);
  let ofAKindRank: string = '';
  for (const rank in rankCount) {
    if (rankCount[rank] === count) {
      ofAKindRank = rank;
      break;
    }
  }

  return getRankValue(ofAKindRank);
}

function getHighestStraightCard(hand: Hand) {
  const rankValues = hand.map((card) => getRankValue(card[0]));
  rankValues.sort((a, b) => a - b);
  if (rankValues[0] === 2 && rankValues[rankValues.length - 1] === 14) {
    return 5;
  }
  return rankValues[rankValues.length - 1];
}

function getHigherFullHouseValue(hand: Hand) {
  const rankCount = getRankCount(hand);
  let threeOfAKindRank = '';
  let pairRank = '';
  // Find the rank that forms the three of a kind and the pair
  for (const rank in rankCount) {
    if (rankCount[rank] === 3) {
      threeOfAKindRank = rank;
    } else if (rankCount[rank] === 2) {
      pairRank = rank;
    }
  }
  return getRankValue(threeOfAKindRank) * 100 + getRankValue(pairRank);
}

function getHigherFlushValue(hand: Hand) {
  const rankValues = hand.map((card) => getRankValue(card[0]));
  rankValues.sort((a, b) => b - a); // Sort in descending order
  return Math.max(...rankValues);
}

function getHigherTwoPairValue(hand: Hand) {
  const rankCount = getRankCount(hand);
  const pairs = [];
  let kickerRank = '';

  // Find the ranks that form the pairs and the kicker
  for (const rank in rankCount) {
    if (rankCount[rank] === 2) {
      pairs.push(rank);
    } else {
      kickerRank = rank;
    }
  }

  const higherPairValue = Math.max(
    getRankValue(pairs[0]),
    getRankValue(pairs[1])
  );
  const lowerPairValue = Math.min(
    getRankValue(pairs[0]),
    getRankValue(pairs[1])
  );

  return higherPairValue * 100 + lowerPairValue * 10 + getRankValue(kickerRank);
}

function getHigherPairValue(hand: Hand) {
  const rankCount = getRankCount(hand);

  let pairRank = '';
  const kickers = [];

  // Find the rank that forms the pair and collect kickers
  for (const rank in rankCount) {
    if (rankCount[rank] === 2) {
      pairRank = rank;
    } else {
      kickers.push(getRankValue(rank));
    }
  }

  kickers.sort((a, b) => b - a); // Sort kickers in descending order

  return (
    getRankValue(pairRank) * 10000 +
    kickers[0] * 100 +
    kickers[1] * 10 +
    kickers[2]
  );
}

function getHigherHighCardValue(hand: Hand) {
  const cardValues = hand.map((card) => getRankValue(card[0]));
  cardValues.sort((a, b) => b - a); // Sort card values in descending order
  return cardValues;
}

function tieBreakerResult(
  playerOneValue: number,
  playerTwoValue: number,
  name: string
): Winner {
  if (playerOneValue > playerTwoValue) {
    return { text: `Player ONE wins, ${name} HIGH CARD`, winner: 1 };
  } else if (playerTwoValue > playerOneValue) {
    return { text: `Player TWO wins, ${name} HIGH CARD`, winner: 2 };
  }
  return { text: `It's a tie ${name}`, winner: 0 };
}

function tieBreakerWithArray(
  playerOneValue: number[],
  playerTwoValue: number[]
): Winner {
  for (let i = 0; i < playerOneValue.length; i++) {
    if (playerOneValue[i] > playerTwoValue[i]) {
      return { text: `Player ONE wins, HIGH CARD`, winner: 1 };
    } else if (playerTwoValue[i] > playerOneValue[i]) {
      return { text: `Player TWO wins, HIGH CARD`, winner: 2 };
    }
  }
  return { text: `It's a tie`, winner: 0 };
}

export function handleTieBreaker(
  handOne: any,
  handTwo: any,
  name: string
): Winner {
  switch (name) {
    case WINS.ROYAL_FLUSH.name:
      return { text: 'SPLIT POT, ROYAL FLUSH', winner: 0 };
    case WINS.STRAIGHT_FLUSH.name:
    case WINS.STRAIGHT.name:
      return tieBreakerResult(
        getHighestStraightCard(handOne),
        getHighestStraightCard(handTwo),
        name
      );
    case WINS.FOUR_OF_A_KIND.name:
      return tieBreakerResult(
        getHigherOfAKindValue(handOne, 4),
        getHigherOfAKindValue(handTwo, 4),
        name
      );
    case WINS.FULL_HOUSE.name:
      return tieBreakerResult(
        getHigherFullHouseValue(handOne),
        getHigherFullHouseValue(handTwo),
        name
      );
    case WINS.FLUSH.name:
      return tieBreakerResult(
        getHigherFlushValue(handOne),
        getHigherFlushValue(handTwo),
        name
      );
    case WINS.THREE_OF_A_KIND.name:
      return tieBreakerResult(
        getHigherOfAKindValue(handOne, 3),
        getHigherOfAKindValue(handTwo, 3),
        name
      );
    case WINS.TWO_PAIR.name:
      return tieBreakerResult(
        getHigherTwoPairValue(handOne),
        getHigherTwoPairValue(handTwo),
        name
      );
    case WINS.PAIR.name:
      return tieBreakerResult(
        getHigherPairValue(handOne),
        getHigherPairValue(handTwo),
        name
      );
    default:
      return tieBreakerWithArray(
        getHigherHighCardValue(handOne),
        getHigherHighCardValue(handTwo)
      );
  }
}
