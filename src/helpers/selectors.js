import React from "react";


export function getAppointmentsForDay(state, day) {
  let apptsForDay = [];
  const matchingDay = state.days.filter((dayObj) => dayObj.name === day);
  if (matchingDay.length < 1) {
    return apptsForDay;
  }
  const appts = matchingDay[0].appointments;
  for (const appt of appts) {
    apptsForDay.push(state.appointments[appt]);
  }
  return apptsForDay;
}

export function getInterview(state, interview) {
  const fullInterviewObj = {};
  if (interview === null) {
    return null;
  }
  const interviewerObj = state.interviewers[interview.interviewer];
  fullInterviewObj.student = interview.student;
  fullInterviewObj.interviewer = interviewerObj;
  return fullInterviewObj;
}