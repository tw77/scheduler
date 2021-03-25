import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  /* Store list of day items, with props to pass each one */
  const listItems = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={props.updateSpots(day, props.appointments)}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  /* Render day list */
  return <ul>{listItems}</ul>;
}
