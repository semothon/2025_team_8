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

interface EventListProps {
  selectedDate: dayjs.Dayjs;
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ selectedDate, events }) => {
  // 이벤트를 시간순으로 정렬
  const sortedEvents = [...events].sort((a, b) => {
    if (a.isAllDay && !b.isAllDay) return -1;
    if (!a.isAllDay && b.isAllDay) return 1;
    return dayjs(a.startTime).unix() - dayjs(b.startTime).unix();
  });

  return (
    <div className="mt-6 px-4 pb-4">
      <h3 className="text-lg text-gray-500 mb-4">
        {selectedDate.format("M월 D일")} 일정
      </h3>
      <div className="space-y-3">
        {sortedEvents.map((event) => (
          <div key={event.event_id} className="flex items-start gap-3">
            <div
              className="w-2 h-2 rounded-full mt-2"
              style={{ backgroundColor: event.color }}
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.timetable_name}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {event.isAllDay ? (
                    <p>하루종일</p>
                  ) : (
                    <p>
                      {dayjs(event.startTime).format("HH:mm")} -{" "}
                      {dayjs(event.endTime).format("HH:mm")}
                    </p>
                  )}
                  {event.location && (
                    <p className="text-gray-400">{event.location}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-gray-400 text-center py-4">일정이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
