import { initTRPC, TRPCError } from "@trpc/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { ZodError } from "zod";
import SuperJSON from "superjson";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerSession(options);
  return {
    session,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },

  transformer: SuperJSON,
});

const middleware = t.middleware;
export const isAuth = middleware(async (opts) => {
  const session = await getServerSession(options);
  const faculty = session?.user;
  if (!faculty) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      ...faculty,
    },
  });
});

export const createTRPCRouter = t.router;
export const privateProcedure = t.procedure.use(isAuth);
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
