import React from "react";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const DaysOfWeek: React.FC = () => {
  return (
    <div className="grid grid-cols-7 text-center py-2 bg-gray-50 rounded-t-lg">
      {daysOfWeek.map((day, index) => (
        <div key={index} className="text-gray-400 text-sm">
          {day}
        </div>
      ))}
    </div>
  );
};

export default DaysOfWeek;
