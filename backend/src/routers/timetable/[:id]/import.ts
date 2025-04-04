import Elysia, { t } from "elysia";
import ical from "node-ical";

import EventModel from "@back/models/event";
import timetableAuthorityService from "@back/guards/timetableAuthorityService";
import exit, { errorElysia } from "@back/utils/error";

const toKST = (date: Date): Date => new Date(date.getTime() + 9 * 60 * 60 * 1000);

const importFromICS = new Elysia()
  .use(timetableAuthorityService)
  .use(EventModel)
  .post(
    "import",
    async ({ body, eventModel, timetable, error }) => {
      const { file } = body;
      const timetableId = timetable._id;

      if (!file || !(file instanceof File)) return exit(error, "ICS_FILE_REQUIRED");

      const arrayBuffer = await file.arrayBuffer();
      const content = Buffer.from(arrayBuffer).toString("utf-8");
      const parsed = ical.parseICS(content);

      const inserted = [];

      const expandUntil = new Date();
      expandUntil.setMonth(expandUntil.getMonth() + 3);

      for (const key in parsed) {
        const item = parsed[key];
        if (item.type !== "VEVENT") continue;

        const duration = new Date(item.end).getTime() - new Date(item.start).getTime();
        const isAllDay =
          item.datetype === "date" ||
          (
            item.start.getUTCHours?.() === 0 &&
            item.start.getUTCMinutes?.() === 0 &&
            item.end.getUTCHours?.() === 0 &&
            item.end.getUTCMinutes?.() === 0
          );

        if (item.rrule) {
          const instances = item.rrule.between(new Date(), expandUntil);

          for (const date of instances) {
            const instanceStart = toKST(new Date(date));
            const instanceEnd = isAllDay
              ? new Date(Date.UTC(
                  instanceStart.getUTCFullYear(),
                  instanceStart.getUTCMonth(),
                  instanceStart.getUTCDate(),
                  23, 59, 59, 999
                ))
              : new Date(instanceStart.getTime() + duration);

            inserted.push(await eventModel.db.create({
              timetable_id: timetableId,
              title: item.summary ?? "",
              startTime: instanceStart,
              endTime: instanceEnd,
              isAllDay
            }));
          }
        } else {
          const startTime = toKST(new Date(item.start));
          const endTime = isAllDay
            ? new Date(Date.UTC(startTime.getUTCFullYear(), startTime.getUTCMonth(), startTime.getUTCDate(), 23, 59, 59, 999))
            : toKST(new Date(item.end));

          inserted.push(await eventModel.db.create({
            timetable_id: timetableId,
            title: item.summary ?? "",
            startTime,
            endTime,
            isAllDay
          }));
        }
      }

      return {
        success: true,
        count: inserted.length,
      };
    },
    {
      body: t.Object(
        {
          file: t.File({ description: "ICS 파일" }),
        },
        { contentType: "multipart/form-data" }
      ),
      response: {
        200: t.Object({
          success: t.Boolean(),
          count: t.Number(),
        }),
        ...errorElysia(["ICS_FILE_REQUIRED"]),
      },
      detail: {
        tags: ["Timetable"],
        summary: "ICS 파일 가져오기",
        description: "ICS (.ics) 파일을 업로드하고, 해당 캘린더에 이벤트를 등록합니다. 시간은 KST 기준으로 보정됩니다.",
      },
    }
  );

export default importFromICS;