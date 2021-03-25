import { useState } from "react";

export default function useVisualMode(initialMode) {
  /* Initialize history state, a reverse-chronological array.
  Displayed mode will always = history[0] */
  const [history, setHistory] = useState([initialMode]);

  /* Transition to a new mode, setting it as history[0] */
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((history) => [newMode, ...history.slice(1)]);
      return;
    }
    setHistory((history) => [newMode, ...history]);
  }

  /* Navigate back by removing current mode at history[0] */
  function back() {
    setHistory((history) => (history.length <= 1 ? history : history.slice(1)));
  }

  return { mode: history[0], transition, back };
}
