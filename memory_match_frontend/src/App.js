import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import './styles/theme.css';
import Header from './components/Header';
import Footer from './components/Footer';
import GameBoard from './components/GameBoard';
import WinModal from './components/WinModal';
import { useGameTimer } from './hooks/useGameTimer';
import { generateDeck } from './utils/generateDeck';

/**
 * PUBLIC_INTERFACE
 * Main App - Memory Match Game
 */
function App() {
  // Difficulty by viewport: 4x4 (8 pairs) small, 6x4 (12 pairs) medium, 8x4 (16 pairs) large
  const pairsByWidth = () => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
    if (w <= 480) return 8;
    if (w <= 900) return 12;
    return 16;
  };

  const [pairCount, setPairCount] = useState(pairsByWidth);
  const [deck, setDeck] = useState(() => generateDeck(pairCount));
  const [flipped, setFlipped] = useState([]);       // array of ids
  const [matchedValues, setMatchedValues] = useState([]); // values that are matched
  const [moves, setMoves] = useState(0);
  const [lockBoard, setLockBoard] = useState(false);
  const [winOpen, setWinOpen] = useState(false);

  const { seconds, start, stop, reset } = useGameTimer();

  // Recompute deck when pairCount changes
  useEffect(() => {
    setDeck(generateDeck(pairCount));
    setFlipped([]);
    setMatchedValues([]);
    setMoves(0);
    setWinOpen(false);
    reset();
  }, [pairCount, reset]);

  // Adjust difficulty on resize for responsiveness
  useEffect(() => {
    const onResize = () => {
      const next = pairsByWidth();
      setPairCount((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Start timer on first flip
  useEffect(() => {
    if (flipped.length === 1 && matchedValues.length === 0 && seconds === 0) {
      start();
    }
  }, [flipped.length, matchedValues.length, seconds, start]);

  // Check for win condition
  const totalPairs = useMemo(() => pairCount, [pairCount]);
  useEffect(() => {
    if (matchedValues.length === totalPairs && totalPairs > 0) {
      stop();
      setWinOpen(true);
    }
  }, [matchedValues.length, totalPairs, stop]);

  const restart = useCallback(() => {
    setDeck(generateDeck(pairCount));
    setFlipped([]);
    setMatchedValues([]);
    setMoves(0);
    setWinOpen(false);
    reset();
  }, [pairCount, reset]);

  const onFlip = useCallback((card) => {
    if (lockBoard) return;
    if (flipped.includes(card.id)) return; // ignore re-click same card
    if (matchedValues.includes(card.value)) return; // already matched

    const nextFlipped = flipped.concat(card.id);

    if (nextFlipped.length === 2) {
      // second card turned
      setLockBoard(true);
      setFlipped(nextFlipped);

      const [firstId, secondId] = nextFlipped;
      const firstCard = deck.find((c) => c.id === firstId);
      const secondCard = deck.find((c) => c.id === secondId);

      // increment moves on each pair attempt
      setMoves((m) => m + 1);

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // match
        setTimeout(() => {
          setMatchedValues((vals) => (vals.includes(firstCard.value) ? vals : vals.concat(firstCard.value)));
          setFlipped([]);
          setLockBoard(false);
        }, 350);
      } else {
        // mismatch - flip back after delay
        setTimeout(() => {
          setFlipped([]);
          setLockBoard(false);
        }, 800);
      }
    } else {
      setFlipped(nextFlipped);
    }
  }, [deck, flipped, lockBoard, matchedValues]);

  return (
    <div className="game-wrap" aria-live="polite">
      <Header seconds={seconds} moves={moves} onRestart={restart} />
      <GameBoard
        cards={deck}
        flippedIds={flipped}
        matchedIds={matchedValues}
        onFlip={onFlip}
        lockBoard={lockBoard}
      />
      <Footer />
      <WinModal
        open={winOpen}
        seconds={seconds}
        moves={moves}
        onRestart={restart}
        onClose={() => setWinOpen(false)}
      />
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {winOpen ? 'Game completed' : ''}
      </div>
    </div>
  );
}

export default App;
