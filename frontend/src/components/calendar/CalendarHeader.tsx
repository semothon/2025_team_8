"use client";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import React from "react";

interface CalendarHeaderProps {
  currentDate: dayjs.Dayjs;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
}) => {
  dayjs.locale("ko");
  return (
    <div className="flex items-center justify-between mb-4">
      <button onClick={onPrevMonth}>
        ←
      </button>
      <h2 className="text-2xl font-bold">
        {currentDate.format("M월")}
      </h2>
      <button onClick={onNextMonth}>
        →
      </button>
    </div>
  );
};

export default CalendarHeader;
