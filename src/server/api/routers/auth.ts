
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  posts: protectedProcedure.mutation(async ({ctx}) => {
    await ctx.supabase.from('users').insert({
      email: 'alexisken@gmail.com'
    })
  }),
  getSession: publicProcedure.query(async ({ctx}) => {
    return await ctx.supabase.auth.getSession()
  })
});
