"use client";

import dayjs from "dayjs";
import React, { useState } from "react";

import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import DaysOfWeek from "./DaysOfWeek";
import EventList from "./EventList";

interface Event {
  timetable_id: string;
  timetable_name: string;
  event_id: string;
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  color: string;
  isAllDay?: boolean;
}

interface Timetable {
  timetable_id: string;
  name: string;
  color: string;
  events: Event[];
}

interface CalendarProps {
  timetables: Timetable[];
}

const CustomCalendar: React.FC<CalendarProps> = ({ timetables }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleSelectDate = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
  };

  // 모든 시간표의 이벤트를 하나의 배열로 합치기
  const allEvents = timetables.flatMap(timetable => 
    timetable.events.map(event => ({
      ...event,
      timetable_name: timetable.name,
      color: timetable.color
    }))
  );

  // 선택된 날짜의 이벤트 필터링
  const selectedDateEvents = allEvents.filter(event => {
    const eventStart = dayjs(event.startTime);
    return (
      eventStart.date() === selectedDate.date() &&
      eventStart.month() === selectedDate.month() &&
      eventStart.year() === selectedDate.year()
    );
  });

  // 각 날짜의 이벤트 개수 계산
  const getDateEvents = (date: dayjs.Dayjs) => {
    return allEvents.filter(event => {
      const eventStart = dayjs(event.startTime);
      return (
        eventStart.date() === date.date() &&
        eventStart.month() === date.month() &&
        eventStart.year() === date.year()
      );
    });
  };

  return (
    <div className="w-full">
      <div className="p-4 bg-white rounded-lg shadow">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <DaysOfWeek />
        <CalendarGrid
          currentDate={currentDate}
          onSelectDate={handleSelectDate}
          selectedDate={selectedDate}
          getDateEvents={getDateEvents}
        />
        <EventList selectedDate={selectedDate} events={selectedDateEvents} />
      </div>
    </div>
  );
};

export default CustomCalendar;
