import Elysia, { t } from "elysia";

import exit, { errorElysia } from "@back/utils/error";
import eventAuthorityService from "@back/guards/eventAuthorityService";

const updateEvent = new Elysia()
  .use(eventAuthorityService)
  .patch(
    "",
    async ({ body, event, eventModel, error }) => {
      const updateData: any = {
        ...(body.title && { title: body.title }),
        ...(body.startTime && { startTime: new Date(body.startTime) }),
        ...(body.endTime && { endTime: new Date(body.endTime) }),
        ...(body.isAllDay !== undefined && { isAllDay: body.isAllDay }),
        ...(body.repeat && { repeat: body.repeat }),
      };

      const updated = await eventModel.db.updateOne(
        { _id: event._id },
        { $set: updateData },
      );

      if (!updated || updated.matchedCount < 1) {
        return exit(error, "UPDATE_FAILED");
      }
      return {
        success: true,
        message: "이벤트 수정 성공",
      };
    },
    {
      params: t.Object({
        id: t.String({ description: "이벤트 ID" }),
      }),
      body: t.Object({
        title: t.Optional(t.String({ example: "스터디 미팅" })),
        startTime: t.Optional(t.String({
          format: "date-time",
          example: "2025-04-10T13:00:00Z"
        })),
        endTime: t.Optional(t.String({
          format: "date-time",
          example: "2025-04-10T14:30:00Z"
        })),
        isAllDay: t.Optional(t.Boolean({ example: false })),
        repeat: t.Optional(
          t.Object({
            frequency: t.Optional(
              t.Union([
                t.Literal("daily"),
                t.Literal("weekly"),
                t.Literal("monthly"),
                t.Null()
              ], {
                example: "weekly"
              })
            ),
            byWeekDay: t.Optional(t.Array(t.Enum({
              MO: "MO", TU: "TU", WE: "WE", TH: "TH", FR: "FR", SA: "SA", SU: "SU"
            }), {
              example: ["MO", "WE"]
            })),
            until: t.Optional(t.String({
              format: "date-time",
              example: "2025-06-30T23:59:59Z"
            }))
          })
        )
      }),
      response: {
        200: t.Object({
          success: t.Boolean({
            description: "이벤트 수정 성공 여부",
            examples: [true],
          }),
          message: t.String({
            description: "이벤트 수정 성공 메시지",
            examples: ["이벤트 수정 성공"],
          }),
        }),
        ...errorElysia(["UPDATE_FAILED"]),
      },
      detail: {
        tags: ["Event"],
        summary: "이벤트 수정",
        description: "이벤트의 제목, 시간, 반복 정보 등을 수정합니다.",
      },
    }
  );

export default updateEvent;