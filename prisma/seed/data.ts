import { Collection, Item, Unit } from "@prisma/client";

export const initialCollections: Collection[] = [
  {
    id: "collection-1",
    name: "Hallgarderob",
    unitIds: ["unit-1", "unit-2"],
  },
  {
    id: "collection-2",
    name: "Vinden",
    unitIds: ["unit-3"],
  },
];

export const initialUnits: Unit[] = [
  {
    id: "unit-1",
    name: "Låda nr 1",
    itemIds: ["item-1", "item-2", "item-4"],
  },
  {
    id: "unit-2",
    name: "Låda nr 2",
    itemIds: ["item-5", "item-6"],
  },
  {
    id: "unit-3",
    name: "Lilla skoskåpet",
    itemIds: ["item-3"],
  },
];

export const initialItems: Item[] = [
  { id: "item-1", name: "Blåa skor" },
  { id: "item-2", name: "Verktygslåda" },
  { id: "item-3", name: "Överlevnadskit" },
  { id: "item-4", name: "Kokkärl" },
  { id: "item-5", name: "Slängkappa" },
  { id: "item-6", name: "Harry Potter-bok" },
];

export const initialCollectionOrder: string[] = [
  "collection-2",
  "collection-1",
];
