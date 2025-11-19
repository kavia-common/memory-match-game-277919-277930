'use strict';
import { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Timer hook with start/stop/reset controls.
 * Returns elapsed seconds and control functions.
 */
export function useGameTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!running) return undefined;
    ref.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [running]);

  // Cleanup on unmount
  useEffect(() => () => {
    if (ref.current) clearInterval(ref.current);
  }, []);

  return {
    seconds,
    running,
    start: () => setRunning(true),
    stop: () => setRunning(false),
    reset: () => {
      setRunning(false);
      setSeconds(0);
    },
  };
}
```

Explanation: Hook for keyboard activation (Enter/Space) and roving tabIndex
````write file="memory-match-game-277919-277930/memory_match_frontend/src/hooks/useKeyboardNavigation.js"
'use strict';
import { useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * Provides a keyDown handler that activates on Enter/Space.
 * @param {(ev:KeyboardEvent)=>void} onActivate
 */
export function useKeyboardActivate(onActivate) {
  return useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate(e);
    }
  }, [onActivate]);
}
