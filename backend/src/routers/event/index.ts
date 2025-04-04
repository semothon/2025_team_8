import Elysia from "elysia";

import list from "./list";
import EventIdRouter from "./[:id]";

const EventRouter = new Elysia({
  name: "Event Router",
  prefix: "event",
})
  .use(list)
  .use(EventIdRouter);

export default EventRouter;