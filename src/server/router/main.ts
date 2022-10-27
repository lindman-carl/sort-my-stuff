import { createRouter } from "./context";
import { z } from "zod";

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

      const [items, units, collections] = await Promise.all([
        userItems,
        userUnits,
        userCollections,
      ]);

      const stuff: Stuff = {
        items,
        units,
        collections,
      };

      return stuff;
    },
  })
  .mutation("collectionCreate", {
    input: z.object({ name: z.string(), id: z.string() }),
    async resolve({ ctx, input }) {
      await ctx.prisma.collection.create({
        data: {
          id: input.id,
          name: input.name,
          unitIds: [],
          type: "COLLECTION",
        },
      });

      return {
        success: true,
        message: `Collection ${input.name} created successfully`,
      };
    },
  })
  .mutation("unitCreate", {
    input: z.object({
      name: z.string(),
      id: z.string(),
      collectionId: z.string(),
      unitIds: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      const createUnit = await ctx.prisma.unit.create({
        data: {
          name: input.name,
          id: input.id,
          itemIds: [],
          type: "UNIT",
        },
      });

      const updateCollection = await ctx.prisma.collection.update({
        where: {
          id: input.collectionId,
        },
        data: {
          unitIds: input.unitIds,
        },
      });

      await Promise.all([createUnit, updateCollection]);

      return {
        success: true,
        message: `Unit ${input.name} in collection ${input.collectionId} created successfully`,
      };
    },
  })
  .mutation("itemCreate", {
    input: z.object({
      name: z.string(),
      id: z.string(),
      unitId: z.string(),
      itemIds: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      const createItem = await ctx.prisma.item.create({
        data: {
          name: input.name,
          id: input.id,
          type: "ITEM",
        },
      });

      const updateUnit = await ctx.prisma.unit.update({
        where: {
          id: input.unitId,
        },
        data: {
          itemIds: input.itemIds,
        },
      });

      await Promise.all([createItem, updateUnit]);

      return {
        success: true,
        message: `Item ${input.name} in unit ${input.unitId} created successfully`,
      };
    },
  });
