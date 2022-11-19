import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

// types
import type { Stuff } from "../../types/types";

export const mainRouter = createRouter()
  .query("getUserStuff", {
    async resolve({ ctx }) {
      if (!ctx.session || !ctx.session?.user?.id) {
        return;
      }

      console.log("session: ", ctx.session);

      const userItems = ctx.prisma.item.findMany({
        where: { userId: ctx.session.user.id },
      });
      const userUnits = ctx.prisma.unit.findMany({
        where: { userId: ctx.session.user.id },
      });
      const userCollections = ctx.prisma.collection.findMany({
        where: { userId: ctx.session.user.id },
      });
      const userData = ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      const [items, units, collections, user] = await Promise.all([
        userItems,
        userUnits,
        userCollections,
        userData,
      ]);

      // error handling
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Couldn't find user by user id",
        });
      }

      const stuff: Stuff = {
        items,
        units,
        collections,
        user,
      };

      return stuff;
    },
  })
  .mutation("collectionCreate", {
    input: z.object({ name: z.string(), id: z.string() }),
    async resolve({ ctx, input }) {
      // check for user session
      if (!ctx.session || !ctx.session?.user?.id) return;

      await ctx.prisma.collection.create({
        data: {
          id: input.id,
          name: input.name,
          type: "COLLECTION",
          userId: ctx.session?.user.id,
          unitsOrder: [],
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
      unitsOrder: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      // check for user session
      if (!ctx.session || !ctx.session?.user?.id) return;
      const createUnit = await ctx.prisma.unit.create({
        data: {
          name: input.name,
          id: input.id,
          type: "UNIT",
          userId: ctx.session.user.id,
          collectionId: input.collectionId,
        },
      });

      // add to collection's unitsOrder
      const newUnitsOrder = [input.id, ...input.unitsOrder];
      const updateCollection = await ctx.prisma.collection.update({
        where: {
          id: input.collectionId,
        },
        data: {
          unitsOrder: newUnitsOrder,
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
    }),
    async resolve({ ctx, input }) {
      // check for user session
      if (!ctx.session || !ctx.session?.user?.id) return;

      const createItem = await ctx.prisma.item.create({
        data: {
          name: input.name,
          id: input.id,
          type: "ITEM",
          userId: ctx.session.user.id,
          unitId: input.unitId,
        },
      });

      await Promise.resolve(createItem);

      return {
        success: true,
        message: `Item ${input.name} in unit ${input.unitId} created successfully`,
      };
    },
  })
  .mutation("updateUnitsOrder", {
    input: z.object({
      newUnitsOrder: z.array(z.string()),
      collectionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      // check for user session
      if (!ctx.session || !ctx.session?.user?.id) return;

      const updateCollection = await ctx.prisma.collection.update({
        where: { id: input.collectionId },
        data: {
          unitsOrder: input.newUnitsOrder,
        },
      });

      await Promise.resolve(updateCollection);

      return {
        success: true,
        message: `Collection ${input.collectionId} unitsOrder has been updated`,
      };
    },
  })
  .mutation("updateItemsOrder", {
    input: z.object({
      newItemsOrder: z.array(z.string()),
      unitId: z.string(),
    }),
    async resolve({ ctx, input }) {
      // check for user session
      if (!ctx.session || !ctx.session?.user?.id) return;

      const updateCollection = await ctx.prisma.unit.update({
        where: { id: input.unitId },
        data: {
          itemsOrder: input.newItemsOrder,
        },
      });

      await Promise.resolve(updateCollection);

      return {
        success: true,
        message: `Unit ${input.unitId} itemsOrder has been updated`,
      };
    },
  })
  .mutation("updateCollectionsOrder", {
    input: z.object({
      newCollectionsOrder: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      // check for user session
      if (!ctx.session || !ctx.session?.user?.id) return;

      const updateCollectionsOrder = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          collectionsOrder: input.newCollectionsOrder,
        },
      });

      await Promise.resolve(updateCollectionsOrder);

      return {
        success: true,
        message: `User ${ctx.session.user.id} collectionsOrder has been updated`,
      };
    },
  })
  .mutation("updateUnitCollectionId", {
    input: z.object({
      newCollectionId: z.string(),
      unitId: z.string(),
    }),
    async resolve({ ctx, input }) {
      // check for user session
      if (!ctx.session || !ctx.session?.user?.id) return;

      const updateUnitCollectionId = await ctx.prisma.unit.update({
        where: { id: input.unitId },
        data: {
          collectionId: input.newCollectionId,
        },
      });

      await Promise.resolve(updateUnitCollectionId);

      return {
        success: true,
        message: `Unit ${input.unitId} has been moved to ${input.newCollectionId}`,
      };
    },
  })
  .mutation("updateItemUnitId", {
    input: z.object({
      newUnitId: z.string(),
      itemId: z.string(),
    }),
    async resolve({ ctx, input }) {
      // check for user session
      if (!ctx.session || !ctx.session?.user?.id) return;

      const updateItemUnitId = await ctx.prisma.item.update({
        where: {
          id: input.itemId,
        },
        data: {
          unitId: input.newUnitId,
        },
      });

      await Promise.resolve(updateItemUnitId);

      return {
        success: true,
        message: `Item ${input.itemId} has been moved to ${input.newUnitId}`,
      };
    },
  });
// .mutation("updateManyItems", {
//   input: z.object({
//     ids: z.array(z.string()),
//   }),
//   async resolve({ ctx, input }) {
//     // check for user session
//     if (!ctx.session || !ctx.session?.user?.id) return;

//     const updateManyItems = await ctx.prisma.item.updateMany({
//       where: {
//         id: {
//           in: input.ids,
//         },
//       },
//       data: {},
//     });
//   },
// });
