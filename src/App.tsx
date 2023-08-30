import React, { useEffect, useState } from 'react';
import { hands as data } from './utils/hands';
import { getWinner } from './utils/getWinner';
import {
  BsFillDiamondFill,
  BsFillHeartFill,
  BsFillSuitClubFill,
  BsFillSuitSpadeFill,
} from 'react-icons/bs';

const suits: any = {
  H: <BsFillHeartFill className="fill-red-600" />,
  C: <BsFillSuitClubFill className="fill-black" />,
  S: <BsFillSuitSpadeFill className="fill-black" />,
  D: <BsFillDiamondFill className="fill-red-600" />,
};

function App({ hands = data }) {
  const [autoPlayOn, setAutoPlayOn] = useState(false);
  const [currentHandIndex, setCurrentHandIndex] = useState(0);
  const [results, setResults] = useState({
    playerOne: 0,
    playerTwo: 0,
    winner: '',
  });
  useEffect(() => {
    const currentHand = hands[currentHandIndex];
    const result = getWinner(currentHand.handOne, currentHand.handTwo);
    setResults((previous) => ({
      playerOne:
        result.winner === 1 ? previous.playerOne + 1 : previous.playerOne,
      playerTwo:
        result.winner === 2 ? previous.playerTwo + 1 : previous.playerTwo,
      winner: result.text,
    }));
  }, [currentHandIndex, hands]);

  useEffect(() => {
    if (autoPlayOn) {
      const intervalId = setInterval(() => {
        const newIndex =
          currentHandIndex + 1 < hands.length ? currentHandIndex + 1 : 0;
        if (newIndex > 0) {
          setCurrentHandIndex(newIndex);
        } else {
          setAutoPlayOn(false);
        }
      }, 50);
      return () => clearInterval(intervalId);
    }
  }, [autoPlayOn, currentHandIndex, hands.length]);

  const buttonClass =
    'text-4xl rounded-3xl border border-amber-50 p-6 hover:bg-amber-100 hover:text-black';

  return (
    <div className="bg-green-600 min-h-screen text-amber-50 flex flex-col gap-10 text-xl p-10">
      <div className="flex gap-3 items-center">
        <button
          className={buttonClass}
          onClick={() => {
            const newIndex =
              currentHandIndex + 1 < hands.length ? currentHandIndex + 1 : 0;
            setCurrentHandIndex(newIndex);
          }}
        >
          Deal Next Hand
        </button>
        <button
          className={buttonClass}
          onClick={() => setAutoPlayOn(!autoPlayOn)}
        >
          Autoplay {autoPlayOn ? 'OFF' : 'ON'}
        </button>
        <p className={'text-4xl p-6 font-bold'}>
          Game {currentHandIndex + 1} / {hands.length}
        </p>
      </div>

      <div className="flex flex-wrap gap-8">
        <div className="w-[500px] border rounded p-3 flex flex-col gap-3">
          <>
            <h2>Player 1</h2>
            <ul className="flex gap-3">
              {hands[currentHandIndex].handOne.map((card: string) => (
                <Card key={card} card={card} />
              ))}
            </ul>
            win count: {results?.playerOne}
          </>
        </div>

        <div className="w-[500px] border rounded p-3 flex flex-col gap-3">
          <>
            <h2>Player 2</h2>
            <ul className="flex gap-3">
              {hands[currentHandIndex].handTwo.map((card: string) => (
                <Card key={card} card={card} />
              ))}
            </ul>
            win count: {results?.playerTwo}
          </>
        </div>
      </div>
      <p className="text-4xl font-bold">{results?.winner}</p>
    </div>
  );
}

const Card = ({ card }: { card: string }) => (
  <li className="bg-white rounded-xl text-black w-[70px] h-[100px] md:w-[100px] md:h-[130px] flex items-center justify-center gap-1">
    {card[0]} {suits[card.charAt(card.length - 1)]}
  </li>
);

export default App;
