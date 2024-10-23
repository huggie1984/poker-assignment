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
    'text-xl md:text-4xl rounded-3xl border border-amber-50 p-4 bg-amber-100 text-black hover:bg-transparent hover:text-amber-50';

  return (
    <main className="bg-green-600 min-h-screen text-amber-50 p-4 md:p-8 flex justify-center">
      <div className="flex flex-col justify-center items-center gap-10 max-w-[800px] w-full">
        <p className="text-xl md:text-4xl font-bold">
          Game {currentHandIndex + 1} / {hands.length}
        </p>
        <section className="flex gap-3 items-center">
          <button
            className={buttonClass}
            onClick={() => {
              const newIndex =
                currentHandIndex + 1 < hands.length ? currentHandIndex + 1 : 0;
              setCurrentHandIndex(newIndex);
            }}
          >
            Deal
          </button>
          <button
            className={buttonClass}
            onClick={() => setAutoPlayOn(!autoPlayOn)}
          >
            Auto Deal {autoPlayOn ? 'OFF' : 'ON'}
          </button>
        </section>

        <section className="flex flex-col gap-8 w-full">
          <div className="border rounded p-3 flex flex-col gap-3 text-sm md:text-base">
            <>
              <h2>Player 1</h2>
              <ul className="grid grid-cols-5 gap-3">
                {hands[currentHandIndex].handOne.map((card: string) => (
                  <Card key={card} card={card} />
                ))}
              </ul>
              win count: {results?.playerOne}
            </>
          </div>

          <div className="border rounded p-3 flex flex-col gap-3 text-sm md:text-base">
            <>
              <h2>Player 2</h2>
              <ul className="grid grid-cols-5 gap-3">
                {hands[currentHandIndex].handTwo.map((card: string) => (
                  <Card key={card} card={card} />
                ))}
              </ul>
              win count: {results?.playerTwo}
            </>
          </div>
        </section>
        <p className="text-xl md:text-4xl font-bold">{results?.winner}</p>
      </div>
    </main>
  );
}

const Card = ({ card }: { card: string }) => (
  <li className="bg-white rounded-xl w-full h-0 pb-[150%] relative">
    <div className="absolute inset-0 flex items-center justify-center gap-1 text-black text-xl md:text-3xl">
      {card[0]} {suits[card.charAt(card.length - 1)]}
    </div>
  </li>
);

export default App;
