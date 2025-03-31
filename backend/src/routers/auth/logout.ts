import Elysia, { t } from "elysia";

const logout = new Elysia().post(
  "logout",
  async ({ cookie }) => {
    cookie.refresh_token.set({
      value: "refresh",
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "none",
      secure: true,
    });
    cookie.access_token.set({
      value: "access",
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "none",
      secure: true,
    });
    return {
      success: true,
    };
  },
  {
    response: {
      200: t.Object({
        success: t.Boolean(),
      }),
    },
    detail: {
      tags: ["Auth"],
      summary: "로그아웃",
      description: "쿠키에 있는 refresh_token과 access_token을 삭제하여 로그아웃합니다.",
    }
  },
);

export default logout;
