import Elysia, { t } from "elysia";
import mongoose, { ObjectId } from "mongoose";

import { IDocument } from "@common/types/db";

interface DTimetable {
  name: string;
  owner_type: "activity" | "user" | "global";
  owner: ObjectId;
}
export type ITimetable = IDocument<DTimetable>;

export const timetableElysiaSchema = t.Object({
  _id: t.String(),
  name: t.String(),
  owner_type: t.Enum({ user: "user", activity: "activity", global: "global" }),
  owner: t.String(),
});

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
    refPath: "owner_type"
  },
});
const TimetableDB = mongoose.model<ITimetable>("Timetable", timetableSchema);

const TimetableModel = new Elysia()
  .decorate("timetableModel", {
    db: TimetableDB,
  });

export default TimetableModel;
