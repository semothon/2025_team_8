import Elysia, { t } from "elysia";

import timetableAuthorityService from "@back/guards/timetableAuthorityService";
import exit, { errorElysia } from "@back/utils/error";
import EventModel from "@back/models/event";

const deleteTimetable = new Elysia()
  .use(timetableAuthorityService())
  .use(EventModel)
  .delete(
    "",
    async ({ timetable, eventModel, timetableModel, error }) => {
      try {
        await eventModel.db.deleteMany({ timetable_id: timetable._id }); 

        await timetableModel.db.deleteOne({ _id: timetable._id });

        return { message: "캘린더(시간표)가 삭제되었습니다." };
      }
      catch {
        return exit(error, "DELETE_FAILED");
      }
      
    },
    {
      params: t.Object({
        id: t.String({ description: "캘린더 ID" }),
      }),
      response: {
        200: t.Object({
          message: t.String(),
        }),
        ...errorElysia(["DELETE_FAILED"]),
      },
      detail: {
        tags: ["Timetable"],
        summary: "캘린더(시간표) 삭제",
        description: "캘린더(시간표)를 삭제합니다.",
      },
    }
  );

export default deleteTimetable;
