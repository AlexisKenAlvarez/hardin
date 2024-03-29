import { authRouter } from "@/server/api/routers/auth";
import { createTRPCRouter } from "@/server/api/trpc";
import { productsRouter } from "./routers/products";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  products: productsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
