import React from "react";

// return an array of appointment objects for a given day
export function getAppointmentsForDay(state, dayName) {
  const apptsForDay = [];
  const day = state.days.filter((day) => day.name === dayName);
  if (day[0] === undefined) {
    return apptsForDay;
  }
  const apptIds = day[0].appointments;
  for (const id of apptIds) {
    apptsForDay.push(state.appointments[id]);
  }
  return apptsForDay;
}

// return an array of interviewer objects for a given day
export function getInterviewersForDay(state, dayName) {
  const interviewersForDay = [];
  const day = state.days.filter((day) => day.name === dayName);
  if (day[0] === undefined) {
    return interviewersForDay;
  }
  const interviewerIds = day[0].interviewers;
  for (const id of interviewerIds) {
    interviewersForDay.push(state.interviewers[id]);
  }
  return interviewersForDay;
}

// return a full interview object, with interviewer data, for a given appointment's "interview" object
export function getInterview(state, interviewObj) {
  if (interviewObj === null) {
    return null;
  }
  const interview = {
    ...interviewObj,
    interviewer: state.interviewers[interviewObj.interviewer],
  };
  return interview;
}
