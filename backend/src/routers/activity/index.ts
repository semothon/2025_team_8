import Elysia from "elysia";

import ActivityIdRouter from "./[id]";
import create from "./create";
import list from "./list";
import listRecruiting from "./list-recruiting";

const ActivityRouter = new Elysia({
  name: "Activity Router",
  prefix: "activity",
})
  .use(list)
  .use(listRecruiting)
  .use(ActivityIdRouter)
  .use(create);

export default ActivityRouter;
