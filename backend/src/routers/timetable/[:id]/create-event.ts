import Elysia, { t } from "elysia";

import EventModel from "@back/models/event";
import timetableAuthorityService from "@back/guards/timetableAuthorityService";
import exit, { errorElysia } from "@back/utils/error";

const eventCreateSchema = t.Object({
  title: t.String({ example: "회의" }),
  startTime: t.String({ format: "date-time", example: "2025-04-05T10:00:00Z" }),
  endTime: t.String({ format: "date-time", example: "2025-04-05T11:00:00Z" }),
  isAllDay: t.Optional(t.Boolean({ example: false })),
  repeat: t.Optional(
    t.Object({
      frequency: t.Enum({ daily: "daily", weekly: "weekly", monthly: "monthly", none: "none" }, { example: "weekly" }),
      byWeekDay: t.Optional(t.Array(t.Enum({
        MO: "MO", TU: "TU", WE: "WE", TH: "TH", FR: "FR", SA: "SA", SU: "SU"
      }), { example: ["MO", "WE"] })),
      until: t.Optional(t.String({ format: "date-time", example: "2025-06-30T23:59:59Z" }))
    })
  )
});

const createEvent = new Elysia()
  .use(timetableAuthorityService)
  .use(EventModel)
  .post(
    "create-event",
    async ({ body, eventModel, timetable, error }) => {
      try {
        const event = await eventModel.db.create({
          timetable_id: timetable._id,
          title: body.title ?? "",
          startTime: new Date(body.startTime),
          endTime: new Date(body.endTime),
          isAllDay: body.isAllDay ?? false,
          repeat: body.repeat?.frequency
            ? {
              frequency: body.repeat.frequency === "none" ? null : body.repeat.frequency,
              byWeekDay: body.repeat.byWeekDay,
              until: body.repeat.until ? new Date(body.repeat.until) : undefined,
            }
            : undefined,
        });

        return {
          message: "Event created",
          eventId: event._id.toString(),
        };
      } catch (err) {
        return exit(error, "INSERT_EVENT_FAILED");
      }
    },
    {
      body: eventCreateSchema,
      response: {
        200: t.Object({
          message: t.String(),
          eventId: t.String(),
        }),
        ...errorElysia(["INSERT_EVENT_FAILED"]),
      },
      detail: {
        tags: ["Event"],
        summary: "이벤트 생성",
        description: "일반 또는 반복 이벤트를 생성합니다.",
      },
    }
  );

export default createEvent;