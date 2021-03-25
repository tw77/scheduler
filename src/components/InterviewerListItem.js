import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {
  /* Allow different CSS when an interviewer is selected */
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
 });

 /* Render interviewer item */
  return (
    <li className={interviewerClass} onClick={props.setInterviewer} >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
