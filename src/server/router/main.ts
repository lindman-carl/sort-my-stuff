import { createRouter } from "./context";

// types
import type { Stuff } from "../../types/types";

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

      const res = await Promise.all([userItems, userUnits, userCollections]);

      const stuff: Stuff = {
        items: res[0],
        units: res[1],
        collections: res[2],
      };

      return stuff;
    },
  });
