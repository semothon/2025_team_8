import Elysia from "elysia";

import getActivity from "@back/guards/getActivity";

import basic_update from "./basic_update";
import details_update from "./details_update";
import info from "./info";
import listTimetable from "./list_timetable";

const ActivityIdRouter = new Elysia({
  name: "Activity Router",
  prefix: ":activity_id",
})
  .use(getActivity)
  .use(info)
  .use(listTimetable)
  .use(basic_update)
  .use(details_update);

export default ActivityIdRouter;
