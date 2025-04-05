"use client";

import dayjs from "dayjs";
import React from "react";

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

interface CalendarGridProps {
  currentDate: dayjs.Dayjs;
  onSelectDate: (date: dayjs.Dayjs) => void;
  selectedDate: dayjs.Dayjs;
  getDateEvents: (date: dayjs.Dayjs) => Event[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  onSelectDate,
  selectedDate,
  getDateEvents,
}) => {
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const calendarDays: dayjs.Dayjs[] = [];
  let day = startDate;
  while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
    calendarDays.push(day);
    day = day.add(1, "day");
  }

  return (
    <div className="grid grid-cols-7 gap-y-2 text-center">
      {calendarDays.map((day) => {
        const isCurrentMonth = day.month() === currentDate.month();
        const isToday = day.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
        const isSelected = day.format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD");
        const events = getDateEvents(day);
        
        return (
          <div key={day.format("YYYY-MM-DD")} className="relative">
            <button
              onClick={() => onSelectDate(day)}
              className={[
                "h-10 w-full rounded-full flex items-center justify-center text-sm relative",
                !isCurrentMonth && "text-gray-300",
                isCurrentMonth && day.day() === 0 && "text-red-500", 
                isCurrentMonth && day.day() === 6 && "text-blue-500",
                isSelected && "bg-gray-100",
                isToday && "font-bold"
              ].filter(Boolean).join(" ")}
            >
              {day.format("D")}
            </button>
            {events.length > 0 && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                {events.slice(0, 3).map((event, index) => (
                  <div
                    key={event.event_id}
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                ))}
                {events.length > 3 && (
                  <div className="w-1 h-1 rounded-full bg-gray-400" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
