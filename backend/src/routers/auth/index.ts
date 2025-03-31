import Elysia from "elysia";

import check from "./check";
import login from "./login";
import logout from "./logout";
import me from "./me";

const AuthRouter = new Elysia({
  name: "Auth Router",
  prefix: "auth",
})
  .use(login)
  .use(logout)
  .use(check)
  .use(me);

export default AuthRouter;
