import Elysia from "elysia";

import list from "./list";

const applicationRouter = new Elysia({
  name: "Application Router",
  prefix: "application",
})
  .use(list);

export default applicationRouter; 