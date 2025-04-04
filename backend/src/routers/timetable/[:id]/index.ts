import Elysia from "elysia";

import deleteTimetable from "./delete";
import updateTimetable from "./update";
import importFromICS from "./import";
import generateICSLink from "./generateICS";
import exportICS from "./export";
import createEvent from "./create-event";

const TimetableIdRouter = new Elysia({
  name: "Timetable Router",
  prefix: ":timetable_id",
})
  .use(deleteTimetable)
  .use(updateTimetable)
  .use(importFromICS)
  .use(generateICSLink)
  .use(exportICS)
  .use(createEvent);

export default TimetableIdRouter;