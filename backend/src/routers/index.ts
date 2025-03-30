import Elysia from "elysia";

import AuthRouter from "./auth";

class Note {
  constructor(public name: string = "Note") {}
  get() {
    return {
      message: this.name,
    };
  }
}

const IndexRouter = new Elysia({
  name: "Index",
  prefix: "",
})
  .decorate("v1", new Note())
  .use(AuthRouter);

export default IndexRouter;
