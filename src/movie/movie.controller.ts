import * as Koa from "koa";
import { Context } from "koa";
import * as Router from "koa-router";
import movieEntity from "../entity/movie";
import * as HttpStatus from "http-status-codes";
import { Repository } from "typeorm";

const routerOpts: Router.IRouterOptions = { prefix: "/movies" };
const router = new Router(routerOpts);

router.get("/", async (ctx: Context) => {
  const movieRepo: Repository<movieEntity> =
    ctx.state.db.getRepository(movieEntity);
  const movies = await movieRepo.find();
  ctx.body = { data: movies };
});

router.get("/:id", async (ctx: Context) => {
  const movieRepo: Repository<movieEntity> =
    ctx.state.db.getRepository(movieEntity);
  const movie = await movieRepo.findOne({
    where: { id: (ctx as any).params.id as string },
  }); // Using type assertion here
  if (!movie) {
    ctx.throw(HttpStatus.StatusCodes.NOT_FOUND);
  }
  ctx.body = { data: { movie: movie } };
});

router.post("/", async (ctx: Context) => {
  try {
    // const movieRepo: Repository<movieEntity> = getRepository(movieEntity);
    const movieRepo: Repository<movieEntity> =
      ctx.state.db.getRepository(movieEntity);
    const movie = movieRepo.create((ctx as any).request.body);
    await movieRepo.save(movie);
    ctx.body = { data: movie };
  } catch (e) {
    console.log(e);
  }
});

router.put("/:id", async (ctx: Koa.Context) => {
  const movieRepo: Repository<movieEntity> =
    ctx.state.db.getRepository(movieEntity);
  const movie = await movieRepo.findOne({
    where: { id: (ctx as any).params.id as string },
  });
  if (!movie) {
    ctx.throw(HttpStatus.StatusCodes.NOT_FOUND);
  }
  movieRepo.merge(movie, (ctx as any).request.body);
  const updatedMovie = await movieRepo.save(movie);
  ctx.body = { data: updatedMovie };
});

router.delete("/:id", async (ctx: Koa.Context) => {
  const movieRepo: Repository<movieEntity> =
    ctx.state.db.getRepository(movieEntity);
  const movieId = (ctx as any).params.id as string;
  const movie = await movieRepo.findOne({ where: { id: movieId } });
  if (!movie) {
    ctx.throw(HttpStatus.StatusCodes.NOT_FOUND);
  }
  await movieRepo.remove(movie);
  ctx.body = "Deleted successfully";
});

export default router;
