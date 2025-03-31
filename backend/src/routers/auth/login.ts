import axios from "axios";
import Elysia, { t } from "elysia";

import User from "@back/models/user";
import exit, { errorElysia } from "@back/utils/error";


const login = new Elysia().use(User).post(
  "login",
  async ({ body, user, cookie, error }) => {
    const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    });
    if (googleResponse.status !== 200) {
      return exit(error, "INVALID_TOKEN");
    }
    const { email, picture, name } = googleResponse.data;

    const update = await user.db.findOneAndUpdate(
      { email },
      {
        picture,
        name,
      },
      {
        new: true,
        upsert: true,
      },
    );

    const refresh = await user.generateToken(update, "refresh");
    const access = await user.generateToken(update, "access");

    cookie.refresh_token.set({
      value: refresh,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    cookie.access_token.set({
      value: access,
      httpOnly: true,
      maxAge: 60 * 15,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    return {
      success: true,
    };
  },
  {
    body: t.Object({
      token: t.String(),
    }),
    response: {
      200: t.Object({
        success: t.Boolean(),
      }),
      ...errorElysia(["USER_NOT_FOUND", "INVALID_TOKEN"]),
    },
    detail: {
      tags: ["Auth"],
      summary: "구글 로그인",
      description: "구글 로그인에서 받은 토큰을 통해 로그인합니다.",
    }
  },
);

export default login;
