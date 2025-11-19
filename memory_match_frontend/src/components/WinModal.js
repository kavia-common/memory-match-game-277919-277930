'use strict';
import React, { useEffect, useRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * Win modal announcing completion and stats.
 */
export default function WinModal({ open, seconds, moves, onRestart, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (open && ref.current) ref.current.focus();
  }, [open]);

  if (!open) return null;

  const minutes = Math.floor(seconds / 60);
  const rem = seconds % 60;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="win-title" aria-describedby="win-desc">
      <div className="modal" tabIndex={-1} ref={ref}>
        <h2 id="win-title">You matched all pairs! 🎉</h2>
        <p id="win-desc" aria-live="assertive">
          Completed in {minutes}m {rem}s with {moves} moves.
        </p>
        <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn secondary" onClick={onClose} aria-label="Close dialog">Close</button>
          <button type="button" className="btn" onClick={onRestart} aria-label="Play again">Play again</button>
        </div>
        <div style={{ marginTop: '.75rem', color: '#64748b' }}>
          Tip: Use <span className="kbd">Enter</span>/<span className="kbd">Space</span> to flip cards.
        </div>
      </div>
    </div>
  );
}
