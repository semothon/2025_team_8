import { IDocument } from "@common/types/db";
import Elysia from "elysia";
import mongoose, { ObjectId, type Document } from "mongoose";

interface DEvent {
  timetable_id: ObjectId;
  title?: string;
  startTime: Date;
  endTime: Date;
  isAllDay?: boolean;

  repeat?: {
    frequency: "daily" | "weekly" | "monthly" | null;
    byWeekDay?: string[];
    until?: Date;
  };
}
export type IEvent = IDocument<DEvent>;

const eventSchema = new mongoose.Schema({
  timetable_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Timetable",
    required: true,
  },
  title: String,
  startTime: Date,
  endTime: Date,
  isAllDay: Boolean,

  repeat: {
    frequency: { type: String, enum: ["daily", "weekly", "monthly"], default: null },
    byWeekDay: [String],
    until: Date,
  },
});
eventSchema.index({ timetable_id: 1, startTime: 1, endTime: 1 });

const EventDB = mongoose.model<IEvent>("Event", eventSchema);

const EventModel = new Elysia()
  .decorate("eventModel", {
    db: EventDB,
  });

export default EventModel;
