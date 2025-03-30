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
  },
);

export default me;
