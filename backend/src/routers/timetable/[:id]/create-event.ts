import Elysia, { t } from "elysia";

import EventModel, { eventElysiaSchema } from "@back/models/event";
import timetableAuthorityService from "@back/guards/timetableAuthorityService";
import exit, { errorElysia } from "@back/utils/error";

const createEvent = new Elysia()
  .use(timetableAuthorityService)
  .use(EventModel)
  .post(
    "create-event",
    async ({ body, eventModel, timetable, error }) => {
      try {
        const repeat = body.repeat?.frequency && body.repeat.frequency !== "none"
          ? {
              frequency: body.repeat.frequency,
              interval: body.repeat.interval ?? 1,
              byWeekDay: body.repeat.byWeekDay,
              bySetPosition: body.repeat.bySetPosition,
              byMonthDay: body.repeat.byMonthDay,
              until: body.repeat.until ? new Date(body.repeat.until) : undefined,
            }
          : undefined;

        const event = await eventModel.db.create({
          timetable_id: timetable._id,
          title: body.title ?? "",
          startTime: new Date(body.startTime),
          endTime: new Date(body.endTime),
          isAllDay: body.isAllDay ?? false,
          repeat,
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
      body: eventElysiaSchema,
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
        description: "일반 또는 반복 이벤트를 생성합니다. `repeat` 옵션으로 고급 반복 설정도 가능합니다.",
      },
    }
  );

export default createEvent;