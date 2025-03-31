import Elysia, { t } from "elysia";

import { Me } from "@common/types/responses";

import getUserInfo from "@back/guards/getUserInfo";

const me = new Elysia().use(getUserInfo).get(
  "me",
  async ({ userInfo }): Promise<Me> => {
    return {
      id: userInfo.id,
      email: userInfo.email,
    };
  },
  {
    response: {
      200: t.Object({
        id: t.String(),
        email: t.String(),
      }),
    },
    detail: {
      tags: ["Auth"],
      summary: "내 정보 가져오기",
      description: "나의 정보를 가져옵니다.",
    }
  },
);

export default me;
