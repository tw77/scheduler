import React from "react";

import "components/Application.scss";
import Appointment from "components/Appointment/index";
import DayList from "components/DayList";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots,
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const listAppts = getAppointmentsForDay(state, state.day).map((appt) => {
    return (
      <Appointment
        key={appt.id}
        id={appt.id}
        time={appt.time}
        interview={getInterview(state, appt.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
            appointments={state.appointments}
            updateSpots={updateSpots}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{listAppts}</section>
    </main>
  );
}
