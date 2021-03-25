import React from "react";
import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";
import Appointment from "components/Appointment/index";
import DayList from "components/DayList";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

export default function Application() {
  const {
    state,
    setDay,
    updateSpots,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  /* Store list of appointments for each day, with data for each appointment to be passed as props. 
  (These props include functions for selecting and updating data, imported here from "helpers/selectors"
  and "hooks/useApplicationData") */
  const listAppts = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={getInterviewersForDay(state, state.day)}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  /* Render application. 
  Pass relevant data (+ functions imported from "hooks/useApplicationData") as props to DayList. */
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
      <section className="schedule">
        {listAppts}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
