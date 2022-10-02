import { createRouter } from "./context";

export const mainRouter = createRouter()
  .query("getAllItems", {
    async resolve({ ctx }) {
      return await ctx.prisma.item.findMany();
    },
  })
  .query("getAllUnits", {
    async resolve({ ctx }) {
      return await ctx.prisma.unit.findMany();
    },
  })
  .query("getAllCollections", {
    async resolve({ ctx }) {
      return await ctx.prisma.collection.findMany();
    },
  });
