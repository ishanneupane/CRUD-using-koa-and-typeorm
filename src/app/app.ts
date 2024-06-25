import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as HttpStatus from "http-status-codes";
import movieController from "../movie/movie.controller";
import connection from "../database/database.connection";
const app = new Koa();

// Error-handling middleware
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    ctx.state.db = connection;
    
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = [  error.message || "Internal Server Error" ];
    ctx.app.emit("error", error,[  error.message || "Internal Server Error" ]);
  }
});
app.use(bodyParser());
// Basic route
app.use(movieController.routes());
app.use(movieController.allowedMethods());

// Centralized error logging
app.on("error", console.error);

export default app;
