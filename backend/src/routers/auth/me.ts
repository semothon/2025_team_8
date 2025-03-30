import Elysia, { t } from "elysia";

import getUserInfo from "@back/guards/getUserInfo";
import { Me } from "@back/utils/responses";

const me = new Elysia().use(getUserInfo).get(
  "me",
  async ({ userInfo }): Promise<Me> => {
    return {
      id: userInfo.id,
      username: userInfo.username,
    };
  },
  {
    response: {
      200: t.Object({
        id: t.String(),
        username: t.String(),
      }),
    },
  },
);

export default me;
