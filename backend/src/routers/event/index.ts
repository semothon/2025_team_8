import Elysia from "elysia";

import importFromICS from "./import";
import createEvent from "./create";
import list from "./list";
import EventIdRouter from "./[:id]";

const EventRouter = new Elysia({
  name: "Event Router",
  prefix: "event",
})
  .use(createEvent)
  .use(list)
  .use(importFromICS)
  .use(EventIdRouter);

export default EventRouter;
