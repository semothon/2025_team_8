import Elysia, { t } from "elysia";
import mongoose, { ObjectId } from "mongoose";
import { IDocument } from "@common/types/db";

export const weekdayList = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;

interface DEvent {
  timetable_id: ObjectId;
  title?: string;
  startTime: Date;
  endTime: Date;
  isAllDay?: boolean;

  repeat?: {
    frequency: "daily" | "weekly" | "monthly" | null;
    interval?: number;
    byWeekDay?: string[];
    bySetPosition?: number;
    byMonthDay?: number;
    until?: Date;
  };
}
export type IEvent = IDocument<DEvent>;

export const eventElysiaSchema = t.Object({
  title: t.String({ example: "회의" }),
  startTime: t.String({ format: "date-time", example: "2025-04-05T10:00:00Z" }),
  endTime: t.String({ format: "date-time", example: "2025-04-05T11:00:00Z" }),
  isAllDay: t.Optional(t.Boolean({ example: false })),
  repeat: t.Optional(
    t.Object({
      frequency: t.Enum(
        { daily: "daily", weekly: "weekly", monthly: "monthly", none: "none" },
        { example: "weekly", description: `"none"이면 반복 없음` }
      ),
      interval: t.Optional(t.Number({ minimum: 1, default: 1, example: 1, description: "daily 사용시 유효, ex. 이틀에 한번 = 2" })),
      byWeekDay: t.Optional(t.Array(t.String({ examples: weekdayList, description: "반복할 요일들" }), { example: ["MO", "WE"] })),
      bySetPosition: t.Optional(t.Number({ example: 2, description: "monthly 사용시 유효, ex. 매월 2번째 화요일 = 2" })),
      byMonthDay: t.Optional(t.Number({ example: 1, description: "monthly 사용시 유효, byWeekDay bySetPosition 속성은 무시됨 , ex. 매월 1일 = 1" })),
      until: t.Optional(t.String({ format: "date-time", example: "2025-06-30T23:59:59Z" }))
    })
  )
});

const eventSchema = new mongoose.Schema<IEvent>({
  timetable_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Timetable",
    required: true,
  },
  title: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isAllDay: Boolean,

  repeat: {
    frequency: { type: String, enum: ["daily", "weekly", "monthly"], default: null },
    interval: { type: Number, default: 1 },
    byWeekDay: [String],
    bySetPosition: Number,
    byMonthDay: Number,
    until: Date,
  },
});

eventSchema.index({ timetable_id: 1, startTime: 1, endTime: 1 });

const EventDB = mongoose.model<IEvent>("Event", eventSchema);

const EventModel = new Elysia().decorate("eventModel", {
  db: EventDB,
});

export default EventModel;