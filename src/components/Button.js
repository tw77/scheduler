import React from "react";
import "components/Button.scss";

const classNames = require('classnames');


export default function Button(props) {
  /* Allow different CSS for different buttons */
   let buttonClass = classNames("button", {
      "button button--confirm": props.confirm,
      "button button--danger": props.danger
   });

  /* Render button */
  return (
   <button
     className={buttonClass}
     onClick={props.onClick}
     disabled={props.disabled}
   >
     {props.children}
   </button>
 );
}
