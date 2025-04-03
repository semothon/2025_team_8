import Elysia from "elysia";

import createTimetable from "./create";
import listTimetable from "./list";
import TimetableIdRouter from "./[:id]";

const TimetableRouter = new Elysia({
  name: "Timetable Router",
  prefix: "timetable",
})
  .use(createTimetable)
  .use(listTimetable)
  .use(TimetableIdRouter);

export default TimetableRouter;
