import Elysia, { t } from "elysia";
import mongoose, { ObjectId } from "mongoose";

import { IDocument } from "@common/types/db";

type Visibility = "public" | "member";

interface DTimetableBase {
  name: string;
  owner_type: "user" | "global" | "activity";
  owner: ObjectId;
}

interface DActivityTimetable extends DTimetableBase {
  owner_type: "activity";
  visibility: Visibility;
}

interface DOtherTimetable extends DTimetableBase {
  owner_type: "user" | "global";
  visibility?: never;
}

type DTimetable = DActivityTimetable | DOtherTimetable;
export type ITimetable = IDocument<DTimetable>;

export type MappedTimetable =
| {
    _id: string;
    name: string;
    owner_type: "user" | "global";
    owner: string;
  }
| {
    _id: string;
    name: string;
    owner_type: "activity";
    owner: string;
    visibility: "public" | "member";
  };

export const timetableElysiaSchema = t.Union([
  t.Object({
    _id: t.String(),
    name: t.String(),
    owner_type: t.Literal("activity"),
    owner: t.String(),
    visibility: t.Enum({ public: "public", member: "member" }, { description: "공개 범위" }),
  }),
  t.Object({
    _id: t.String(),
    name: t.String(),
    owner_type: t.Enum({ user: "user", global: "global" }),
    owner: t.String(),
  }),
]);

const timetableSchema = new mongoose.Schema<ITimetable>({
  name: { type: String, required: true },
  owner_type: {
    type: String,
    enum: ["activity", "user", "global"],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "owner_type",
  },
  visibility: {
    type: String,
    enum: ["public", "member"],
    required: function (this: any) {
      return this.owner_type === "activity";
    },
    default: "member",
  },
});
const TimetableDB = mongoose.model<ITimetable>("Timetable", timetableSchema);

const TimetableModel = new Elysia()
  .decorate("timetableModel", {
    db: TimetableDB,
  });

export default TimetableModel;
