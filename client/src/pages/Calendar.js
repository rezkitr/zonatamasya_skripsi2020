import React from "react";

import PageBanner from "../components/PageBanner";
import CalendarList from "../components/CalendarList";

import calendarImage from '../assets/calendar.png'

function Calendar() {
  return (
    <div className="calendar-page">
    <PageBanner
        img={calendarImage}
        title={"Kalendar Open Trip"}
        subtitle={
          "Masih bingung kapan mau liburan? Bisa lihat dulu jadwalnya di sini ya!"
        }
      />
      <CalendarList />
    </div>
  );
}

export default Calendar;
