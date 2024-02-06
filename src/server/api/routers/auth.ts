
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  posts: publicProcedure.mutation(async ({ctx}) => {
    await ctx.supabase.from('users').insert({
      email: 'alexisken@gmail.com'
    })
  })
});
