import { Stuff } from "../../types/types";

export const initialData: Stuff = {
  // items
  items: [
    { id: "item-1", name: "Röda skor" },
    { id: "item-2", name: "Verktygslåda" },
    { id: "item-3", name: "Överlevnadskit" },
    { id: "item-4", name: "Stekpanna" },
    { id: "item-5", name: "Hopprep" },
    { id: "item-6", name: "Harry Potter-bok" },
  ],
  // units
  units: [
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
  ],
  // collections
  collections: [
    {
      id: "collection-1",
      name: "Klädkammare",
      unitIds: ["unit-1", "unit-2"],
    },
    {
      id: "collection-2",
      name: "Källaren",
      unitIds: ["unit-3"],
    },
  ],
};
