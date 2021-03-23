import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]); 

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(history => [newMode, ...history.slice(1)])
    } else {
      setHistory(history => [newMode, ...history]);
    }
  }

  function back() {
    setHistory(history => (history.length <= 1) ? history : history.slice(1))
  }

  return { mode: history[0], transition, back };
}
