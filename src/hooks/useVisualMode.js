import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    setMode(newMode);
    history.push(newMode);
  }

  function back() {
    if (history.length < 2) {
      return undefined;
    }
    const prevIndex = history.length - 2;
    setMode(history[prevIndex]);
    history.pop();
  }

  return { mode, transition, back };
}
