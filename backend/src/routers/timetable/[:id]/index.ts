import Elysia from "elysia";

import deleteTimetable from "./delete";
import updateTimetable from "./update";
import generateICSLink from "./generateIcs";
import exportICS from "./export";

const TimetableIdRouter = new Elysia({
  name: "Timetable Router",
  prefix: ":timetable_id",
})
  .use(deleteTimetable)
  .use(updateTimetable)
  .use(generateICSLink)
  .use(exportICS);

export default TimetableIdRouter;