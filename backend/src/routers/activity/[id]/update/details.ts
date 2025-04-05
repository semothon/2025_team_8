import Elysia, { t } from "elysia";

import activityAuthorityService from "@back/guards/activityAuthorityService";
import ActivityModel, { activityElysiaSchema } from "@back/models/activity";
import exit, { errorElysia } from "@back/utils/error";

const details = new Elysia()
  .use(activityAuthorityService())
  .use(ActivityModel)
  .patch(
    "/details",
    async ({ body, activity, activityModel, error }) => {
      const updateData = {
        ...body,
      };

      const updated = await activityModel.db.updateOne(
        { _id: activity._id },
        { $set: updateData },
      );

      if (!updated || updated.matchedCount < 1) {
        return exit(error, "UPDATE_FAILED");
      }

      return {
        success: true,
        data: {
          ...activity,
          ...updateData,
        },
      };
    },
    {
      params: t.Object({
        id: t.String({ description: "동아리 ID" }),
      }),
      body: t.Partial(
        t.Object({
          headline: activityElysiaSchema.properties.headline,
          video_url: activityElysiaSchema.properties.video_url,
          description: activityElysiaSchema.properties.description,
          activity_history: activityElysiaSchema.properties.activity_history,
          awards: activityElysiaSchema.properties.awards,
          images_url: activityElysiaSchema.properties.images_url,
          questions: activityElysiaSchema.properties.questions,
          is_hidden: activityElysiaSchema.properties.is_hidden,
          is_always_recruiting: activityElysiaSchema.properties.is_always_recruiting,
          document_screening_period: activityElysiaSchema.properties.document_screening_period,
          document_result_date: activityElysiaSchema.properties.document_result_date,
          interview_period: activityElysiaSchema.properties.interview_period,
          interview_result_date: activityElysiaSchema.properties.interview_result_date,
          final_result_date: activityElysiaSchema.properties.final_result_date,
        })
      ),
      response: {
        200: t.Object({
          success: t.Boolean({
            description: "수정 성공 여부",
            examples: [true],
          }),
          data: activityElysiaSchema,
        }),
        ...errorElysia(["UPDATE_FAILED"]),
      },
      detail: {
        tags: ["Activity"],
        summary: "활동(동아리) 상세 정보 수정",
        description: "활동(동아리) 상세 정보(지원서 질문 목록, 모집 기간 등)를 수정합니다. 활동(동아리) 회장/부회장만 접근 가능합니다.",
      },
    }
  );

export default details;
