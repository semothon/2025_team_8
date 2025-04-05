import Elysia from "elysia";

import ActivityRouter from "./activity";
import ApplicationRouter from "./application";
import AuthRouter from "./auth";
import EventRouter from "./event";
import TimetableRouter from "./timetable";

const IndexRouter = new Elysia({
  name: "Index",
  prefix: "",
})
  .use(AuthRouter)
  .use(ActivityRouter)
  .use(ApplicationRouter)
  .use(TimetableRouter)
  .use(EventRouter);

export default IndexRouter;
