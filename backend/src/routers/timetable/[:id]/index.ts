import Elysia from "elysia";

import deleteTimetable from "./delete";
import updateTimetable from "./update";


const TimetableIdRouter = new Elysia({
  name: "Timetable Router",
  prefix: ":timetable_id",
})
  .use(deleteTimetable)
  .use(updateTimetable);

export default TimetableIdRouter;