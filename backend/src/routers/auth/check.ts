import Elysia, { t } from "elysia";

import User from "@back/models/user";
import exit, { errorElysia } from "@back/utils/error";

const check = new Elysia().use(User).post(
  "check",
  async ({ body, user, error }) => {
    const { refresh_token } = body;
    if (!refresh_token) return exit(error, "NO_REFRESH_TOKEN");
    const verify = await user.verifyToken(refresh_token);
    if (!verify) return exit(error, "UNAUTHORIZED");
    return {
      success: true,
    };
  },
  {
    body: t.Object({
      refresh_token: t.String(),
    }),
    response: {
      200: t.Object({
        success: t.Boolean(),
      }),
      ...errorElysia(["NO_REFRESH_TOKEN", "UNAUTHORIZED"]),
    },
    detail: {
      tags: ["Auth"],
      summary: "Refresh Token 확인",
      description: "NextJS의 Middleware에서 사용되는 API입니다. refresh_token을 통해 유효성을 검사합니다.",
    }
  },
);

export default check;
