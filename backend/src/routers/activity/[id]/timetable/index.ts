import Elysia from "elysia";

import getActivity from "@back/guards/getActivity";

import list from "./list";

const timetableRouter = new Elysia({
  name: "Timetable Router",
  prefix: "timetable",
})
  .use(getActivity)
  .use(list);

export default timetableRouter; 