import Elysia, { t } from "elysia";

import getUser from "@back/guards/getUser";
import timetableAuthorityService from "@back/guards/timetableAuthorityService";
import { generateIcsAccessToken } from "@back/utils/icsToken";

const generateICSLink = new Elysia()
  .use(getUser)
  .use(timetableAuthorityService)
  .get(
    "/ics-link",
    async ({ user, timetable }) => {
      const token = await generateIcsAccessToken(timetable._id.toString(), user._id.toString());
      
      const link = `${process.env.NEXT_PUBLIC_API_URL}/timetable/${timetable._id.toString()}/export.ics?token=${token}`;

      return { link };
    },
    {
      params: t.Object({
        id: t.String({ description: "캘린더 ID" }),
      }),
      response: t.Object({
        link: t.String({ description: "ICS 구독 링크" }),
      }),
      detail: {
        tags: ["Timetable"],
        summary: "ICS 구독 링크 생성",
        description: "현재 사용자가 접근 가능한 캘린더에 대한 .ics 구독 링크를 생성합니다.",
      }
    }
  );

export default generateICSLink;
