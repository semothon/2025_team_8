import Elysia, { t } from "elysia";
import ical from "node-ical";
import exit, { errorElysia } from "@back/utils/error";

import EventModel from "@back/models/event";

const importFromICS = new Elysia().use(EventModel).post(
  "import",
  async ({ body, eventModel, error }: any) => {
    const { file, timetableId } = body;

    if (!timetableId) return exit(error, "TIMETABLEID_REQUIRED")
    if (!file || !(file instanceof File)) return exit(error, "ICS_FILE_REQUIRED")

    const arrayBuffer = await file.arrayBuffer();
    const content = Buffer.from(arrayBuffer).toString("utf-8");
    const parsed = ical.parseICS(content);

    const inserted = [];

    const expandUntil = new Date();
    expandUntil.setMonth(expandUntil.getMonth() + 3);

    for (const key in parsed) {
      const item = parsed[key];

      if (item.type !== "VEVENT") continue;

      const duration = item.end.getTime() - item.start.getTime();
      const isAllDay =
        item.datetype === "date" ||
        (item.start.getUTCHours() === 0 &&
          item.start.getUTCMinutes() === 0 &&
          item.end.getUTCHours() === 0 &&
          item.end.getUTCMinutes() === 0);

      if (item.rrule) {
        const instances = item.rrule.between(new Date(), expandUntil);

        for (const date of instances) {
          let instanceStart = date;
          let instanceEnd = new Date(date.getTime() + duration);

          if (isAllDay) {
            instanceStart = new Date(date);
            instanceEnd = new Date(date);
            instanceEnd.setHours(23, 59, 59, 999);
          }

          inserted.push(
            await eventModel.db.create({
              timetable_id: timetableId,
              title: item.summary,
              startTime: instanceStart,
              endTime: instanceEnd,
              location: item.location || "",
              memo: item.description || "",
              isAllDay,
            })
          );
        }
      }

      else {
        let startTime:Date = item.start;
        let endTime:Date = item.end;
      
        const isAllDay =
          item.datetype === "date" ||
          (item.start.getUTCHours() === 0 &&
            item.start.getUTCMinutes() === 0 &&
            item.end.getUTCHours() === 0 &&
            item.end.getUTCMinutes() === 0);
      
        if (isAllDay) {
          startTime = new Date(item.start);
          endTime = new Date(item.start);
          endTime.setHours(23, 59, 59, 999);
        }

        inserted.push(
          await eventModel.db.create({
            timetable_id: timetableId,
            title: item.summary,
            startTime: startTime,
            endTime: endTime,
            location: item.location || "",
            memo: item.description || "",
            isAllDay,
          })
        );
      }
    }

    return {
      message: "Events imported",
      count: inserted.length,
    };
  }, {
    detail: {
      tags: ["Event"],
      summary: "ICS 파일을 업로드하여 이벤트를 생성",
      description: "ICS (.ics) 파일을 업로드하고, 해당 타임테이블에 이벤트를 등록합니다.",
    },
    body: t.Object(
      {
        file: t.File({ description: "ICS 파일" }),
        timetableId: t.String({ description: "MongoDB ObjectId" }),
      },
      { contentType: "multipart/form-data" }
    ),
    response: {
      200: t.Object({
        message: t.String(),
        count: t.Number(),
      }),
      ...errorElysia(["TIMETABLEID_REQUIRED", "ICS_FILE_REQUIRED"]),
    }
  }
);

export default importFromICS;