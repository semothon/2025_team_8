import Elysia, { t } from "elysia";

import getUser from "@back/guards/getUser";
import TimetableModel, { ITimetable, timetableElysiaSchema } from "@back/models/timetable";
import { IUser } from "@back/models/user";
import JoinedActivityModel from "@back/models/joined_activity";
import { ObjectId } from "mongoose";

const listTimetable = new Elysia().use(getUser).use(TimetableModel).use(JoinedActivityModel).get(
  "",
  async ({ timetableModel, user, joinedActivityModel }) => {
    const userId = (user as IUser)._id

    const joinedActivity = await joinedActivityModel.db.find({ user_id: userId });
    const activityIds = joinedActivity?.map((j) => j.activity_id);

    const timetables = await timetableModel.db.find({
      $or: [
        { owner_type: "user", owner: userId },
        { owner_type: "activity", owner: { $in: activityIds } },
        { owner_type: "global" },
      ]
    });

    if (!timetables || timetables.length === 0) {
      return [];
    }

    const timetableList = timetables.map((timetable) => {
      return {
        _id: (timetable._id as ObjectId).toString(),
        name: timetable.name,
        owner_type: timetable.owner_type,
        owner: (timetable._id as ObjectId).toString(),
      };
    });

    return timetableList;
  },
  {
    detail: {
      tags: ["Timetable"],
      summary: "사용자가 접근 가능한 타임테이블 목록 조회",
      description:
        "사용자 본인, 소속된 동아리, 또는 전역(global) 공개된 시간표들을 모두 불러옵니다.",
    },
    response: {
      200: t.Array(timetableElysiaSchema)
    }
  },
);

export default listTimetable;