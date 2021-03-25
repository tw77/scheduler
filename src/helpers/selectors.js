/* Return an array of appointment objects for a given day */
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

/* Return an array of interviewer objects for a given day */
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

/* Given an appointment's "interview" property, return a full interview object including interviewer data */
export function getInterview(state, interviewProperty) {
  if (interviewProperty === null) {
    return null;
  }
  const interviewerId = interviewProperty.interviewer;
  const interview = {
    ...interviewProperty,
    interviewer: state.interviewers[interviewerId],
  };
  return interview;
}
