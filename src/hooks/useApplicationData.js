import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState(state => ({ ...state, day }));

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

  function updateSpots(day, appointments) {
    const dayApptIds = day.appointments;
    let numOfSpots = 0;
    for (const id of dayApptIds) {
      !appointments[id].interview && numOfSpots++;
    }
    return numOfSpots;
  }

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
}
