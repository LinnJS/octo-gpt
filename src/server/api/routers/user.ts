import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  // Fetch a user's details by email, including all related accounts
  getUserByEmail: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const userWithAccounts = await ctx.db.user.findUnique({
        where: { email: input.email },
        include: {
          accounts: true, // Include all related accounts in the response
        },
      });

      if (!userWithAccounts) throw new Error("User not found");

      return userWithAccounts;
    }),

  getUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
      });

      if (!user) throw new Error("User not found");

      return user;
    }),
});
