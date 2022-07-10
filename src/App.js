import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

import './style.css';

import Dice from './Dice';

export default function App() {
  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dices.every((dice) => dice.isHeld);
    const sameDice = dices[0].value;
    const isAllSameDice = dices.every((dice) => dice.value === sameDice);

    if (allHeld && isAllSameDice) {
      setTenzies(true);
    }
  }, [dices]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let diceFaces = [];

    for (let i = 0; i < 10; i++) {
      diceFaces.push(generateNewDice());
    }

    return diceFaces;
  }

  const diceElements = dices.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  function rollDice() {
    if (!tenzies) {
      setDices((oldDices) =>
        oldDices.map((dice) => (dice.isHeld ? dice : generateNewDice()))
      );
    } else {
      setTenzies(false);
      setDices(allNewDice());
    }
  }

  function holdDice(id) {
    setDices((oldDices) =>
      oldDices.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--container">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  );
}
