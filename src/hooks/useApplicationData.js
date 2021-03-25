import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  /* Initialize state */
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  /* Retrieve days, appointments and interviewers data, then update state with it */
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  /* Update day state */
  function setDay(day) {
    setState((state) => ({ ...state, day }));
  }

  /* Calculate the number of interview spots remaining for a given day */
  function updateSpots(day, appointments) {
    const dayApptIds = day.appointments;
    let spotsRemaining = 0;
    for (const id of dayApptIds) {
      !appointments[id].interview && spotsRemaining++;
      // (where an appointment's interview property is null, a spot is remaining)
    }
    return spotsRemaining;
  }

  /* Add new interview to database and update state */
  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        return setState({
          ...state,
          appointments,
        });
      });
  }

  /* Remove interview from database and update state */
  function cancelInterview(id, interview) {
    return axios
      .delete(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: null,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        return setState({
          ...state,
          appointments,
        });
      });
  }

  return { state, setDay, updateSpots, bookInterview, cancelInterview };
}
