import Elysia, { t } from "elysia";
import { createEvents } from "ics";

import EventModel, { weekdayList } from "@back/models/event";
import getTimetable from "@back/guards/getTimetable";
import TimetableModel from "@back/models/timetable";
import exit, { errorElysia } from "@back/utils/error";

function findNextValidWeekday(date: Date, allowedWeekdays: string[]): Date {
  const d = new Date(date);
  for (let i = 0; i < 7; i++) {
    const weekday = weekdayList[d.getUTCDay()];
    if (allowedWeekdays.includes(weekday)) return d;
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return date;
}

const exportICS = new Elysia()
  .use(getTimetable)
  .use(EventModel)
  .use(TimetableModel)
  .get(
    "export.ics",
    async ({ query, eventModel, timetable, timetableModel, set, error }) => {
      const { token } = query;

      if (!token) return exit(error, "NO_TOKEN");

      let payload;
      try {
        payload = await timetableModel.verifyIcsAccessToken(token);
      } catch {
        return exit(error, "INVALID_TOKEN");
      }

      if (payload.tid !== timetable._id.toString()) return exit(error, "TOKEN_TID_MISMATCH");

      const events = await eventModel.db.find({ timetable_id: timetable._id });

      const icsEvents = events.map((e) => {
        let startTime = new Date(e.startTime);
        let endTime = new Date(e.endTime);

        const duration = endTime.getTime() - startTime.getTime();

        if (e.repeat?.byWeekDay?.length) {
          startTime = findNextValidWeekday(startTime, e.repeat.byWeekDay);
          endTime = new Date(startTime.getTime() + duration);
        }

        const icsEvent: any = {
          title: e.title ?? "Untitled",
          start: [
            startTime.getUTCFullYear(),
            startTime.getUTCMonth() + 1,
            startTime.getUTCDate(),
            startTime.getUTCHours(),
            startTime.getUTCMinutes(),
          ],
          end: [
            endTime.getUTCFullYear(),
            endTime.getUTCMonth() + 1,
            endTime.getUTCDate(),
            endTime.getUTCHours(),
            endTime.getUTCMinutes(),
          ],
          startInputType: "utc",
          endInputType: "utc",
          status: "CONFIRMED",
        };

        if (e.repeat?.frequency) {
          const freq = e.repeat.frequency.toUpperCase();
          const parts: string[] = [`FREQ=${freq}`];
        
          if (e.repeat.interval && e.repeat.interval > 1) {
            parts.push(`INTERVAL=${e.repeat.interval}`);
          }
        
          if (e.repeat.byWeekDay?.length) {
            parts.push(`BYDAY=${e.repeat.byWeekDay.join(",")}`);
          }
        
          if (e.repeat.byMonthDay) {
            parts.push(`BYMONTHDAY=${e.repeat.byMonthDay}`);
          }
        
          if (e.repeat.bySetPosition) {
            parts.push(`BYSETPOS=${e.repeat.bySetPosition}`);
          }
        
          if (e.repeat.until) {
            const until = e.repeat.until.toISOString().replace(/[-:]|\.\d{3}/g, "");
            parts.push(`UNTIL=${until}`);
          }
        
          icsEvent.recurrenceRule = parts.join(";");
        }        

        return icsEvent;
      });
      
      const { error: icsErr, value } = createEvents(icsEvents);
      console.log(icsErr);
      
      if (icsErr) return exit(error, "CREATE_ICS_FILE_FAILED");

      set.headers["Content-Type"] = "text/calendar";
      set.headers["Content-Disposition"] = `attachment; filename="timetable.ics"`;

      return value;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      query: t.Object({
        token: t.String(),
      }),
      response: {
        200: t.String(),
        ...errorElysia(["NO_TOKEN", "INVALID_TOKEN", "TOKEN_TID_MISMATCH", "CREATE_ICS_FILE_FAILED"]),
      },
      detail: {
        tags: ["Timetable"],
        summary: "ICS 파일 다운로드 (.ics)",
        description: "비공개 토큰을 통해 해당 시간표의 ICS 파일을 생성하고 다운로드합니다.",
      }
    }
  );

export default exportICS;