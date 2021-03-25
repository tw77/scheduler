import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {
  /* Allow different CSS when a day is selected or full */
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
 });

  /* Format "spots remaining" message */
  function formatSpots(spots) {
    if (spots > 1) {
      return (props.spots + " spots remaining");
    }
    if (spots === 1) {
      return (props.spots + " spot remaining");
    }
    else return "no spots remaining";
  }

  /* Render day item */
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}