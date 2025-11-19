'use strict';
import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header displaying game title, timer, moves and restart action.
 */
export default function Header({ seconds, moves, onRestart }) {
  const format = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const r = (s % 60).toString().padStart(2, '0');
    return `${m}:${r}`;
  };

  return (
    <header className="header" role="banner">
      <div className="brand" aria-label="Memory Match Game">
        <div className="logo" aria-hidden="true" />
        <h1 className="title">Memory Match</h1>
      </div>
      <div className="stats" role="group" aria-label="Game statistics">
        <div className="stat" aria-live="polite" aria-atomic="true">Time: {format(seconds)}</div>
        <div className="stat" aria-live="polite" aria-atomic="true">Moves: {moves}</div>
        <button type="button" className="btn secondary" onClick={onRestart} aria-label="Restart game">
          Restart
        </button>
      </div>
    </header>
  );
}
