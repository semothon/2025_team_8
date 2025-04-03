import Elysia, { t } from "elysia";

import getUser from "@back/guards/getUser";
import { IUser } from "@back/models/user";
import EventModel from "@back/models/event";
import TimetableModel from "@back/models/timetable";
import JoinedActivityModel from "@back/models/joined_activity";

const WEEKDAY_MAP = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

function getWeekdayCode(date: Date): string {
  return WEEKDAY_MAP[date.getUTCDay()];
}

function generateRepeatInstances(event: any, from: Date, to: Date) {
  const instances = [];
  const { frequency, byWeekDay, until } = event.repeat;
  const repeatUntil = until ? new Date(until) : to;
  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  let current = new Date(start);
  while (current <= repeatUntil && current <= to) {
    const weekday = getWeekdayCode(current);

    if (!byWeekDay || byWeekDay.includes(weekday)) {
      const instanceStart = new Date(current);
      const duration = end.getTime() - start.getTime();
      const instanceEnd = new Date(instanceStart.getTime() + duration);

      if (instanceEnd >= from && instanceStart <= to) {
        instances.push({
          _id: event._id.toString(),
          timetable_id: event.timetable_id.toString(),
          title: event.title ?? "",
          startTime: instanceStart.toISOString(),
          endTime: instanceEnd.toISOString(),
          isAllDay: event.isAllDay ?? false,
        });
      }
    }

    switch (frequency) {
      case "daily":
        current.setUTCDate(current.getUTCDate() + 1);
        break;
      case "weekly":
        current.setUTCDate(current.getUTCDate() + 1);
        break;
      case "monthly":
        current.setUTCMonth(current.getUTCMonth() + 1);
        break;
    }
  }

  return instances;
}

const list = new Elysia()
  .use(getUser)
  .use(JoinedActivityModel)
  .use(TimetableModel)
  .use(EventModel)
  .get(
    "",
    async ({ user, joinedActivityModel, timetableModel, eventModel, query }) => {
      const userId = (user as IUser)._id;

      const from = query.from ? new Date(query.from) : new Date();
      const to = query.to ? new Date(query.to) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

      const joined = await joinedActivityModel.db.find({ user_id: userId });
      const activityIds = joined.map(j => j.activity_id);

      const timetables = await timetableModel.db.find({
        $or: [
          { owner_type: "user", owner: userId },
          { owner_type: "activity", owner: { $in: activityIds } },
          { owner_type: "global" },
        ],
      }).lean();

      const timetableIds = timetables.map((t) => t._id);

      const singleEvents = await eventModel.db.find({
        timetable_id: { $in: timetableIds },
        startTime: { $lte: to },
        endTime: { $gte: from },
        $or: [
          { repeat: { $exists: false } },
          { "repeat.frequency": null }
        ],
      });

      const repeatingEvents = await eventModel.db.find({
        timetable_id: { $in: timetableIds },
        "repeat.frequency": { $ne: null }
      });
      
      const events = [];

      for (const event of singleEvents) {
        events.push({
          _id: event._id.toString(),
          timetable_id: event.timetable_id.toString(),
          title: event.title ?? "",
          startTime: event.startTime.toISOString(),
          endTime: event.endTime.toISOString(),
          isAllDay: event.isAllDay ?? false,
        });
      }
      
      for (const event of repeatingEvents) {
        events.push(...generateRepeatInstances(event, from, to));
      }

      return { events };
    },
    {
      query: t.Object({
        from: t.String({ format: "date", description: "조회 시작일", example: "2025-01-01"}),
        to: t.String({ format: "date", description: "조회 종료일", example: "2025-12-31" }),
      }),
      response: t.Object({
        events: t.Array(
          t.Object({
            _id: t.String(),
            timetable_id: t.String(),
            title: t.String(),
            startTime: t.String({ format: "date-time" }),
            endTime: t.String({ format: "date-time" }),
            isAllDay: t.Optional(t.Boolean()),
          })
        ),
      }),
      detail: {
        tags: ["Event"],
        summary: "사용자 접근 가능한 이벤트 목록 조회",
        description: "일반 및 반복 이벤트를 조회 기간 내 인스턴스로 반환합니다.",
      },
    }
  );

export default list;
