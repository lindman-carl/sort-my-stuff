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
  })
  .query("getStuff", {
    async resolve({ ctx }) {
      const userItems = ctx.prisma.item.findMany();
      const userUnits = ctx.prisma.unit.findMany();
      const userCollections = ctx.prisma.collection.findMany();

      return await Promise.all([userItems, userUnits, userCollections]);
    },
  });
