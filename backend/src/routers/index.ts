import Elysia from "elysia";

import ActivityRouter from "./activity";
import ApplicationRouter from "./application";
import AuthRouter from "./auth";

const IndexRouter = new Elysia({
  name: "Index",
  prefix: "",
})
  .use(AuthRouter)
  .use(ActivityRouter)
  .use(ApplicationRouter);

export default IndexRouter;
