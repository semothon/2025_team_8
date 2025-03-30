import Elysia from "elysia";

import AuthRouter from "./auth";

const IndexRouter = new Elysia({
  name: "Index",
  prefix: "",
})
  .use(AuthRouter);

export default IndexRouter;
