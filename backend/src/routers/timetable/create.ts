import Elysia, { t } from "elysia";
import { ObjectId } from "mongoose";

import TimetableModel from "@back/models/timetable";
import exit, { errorElysia } from "@back/utils/error";

const createTimetable = new Elysia().use(TimetableModel).post(
  "",
  async ({ body, timetableModel, error }) => {
    try {
      const timetable = await timetableModel.db.create({
        name: body.name,
        owner_type: body.owner_type,
        owner: body.owner,
      });

      return {
        message: "Timetable created",
        timetableId: (timetable._id as ObjectId).toString(),
      };
    } catch (err) {
      return exit(error, "INSERT_TIMETABLE_FAILED")
    }
  },
  {
    body: t.Object({
      owner_type: t.String({ description: "소유자 유형", examples: { 동아리: "activity", 사용자: "user", 전역: "global" }}),
      owner: t.String({ description: "소유자 ObjectId" }),
      name: t.Optional(t.String({ description: "타임테이블 이름" })),
    }),
    response: {
      200: t.Object({
        message: t.String(),
        timetableId: t.String(),
      }),
      ...errorElysia(["INSERT_TIMETABLE_FAILED"]),
    },
    detail: {
      tags: ["Timetable"],
      summary: "타임테이블 생성",
      description: `"global", "user", "activity" 모든 경우에 owner 필드는 필수이며, owner_type에 따라 해당 소유자가 개인, 동아리, 전체용임을 구분합니다.`,
    },
  }
);

export default createTimetable;