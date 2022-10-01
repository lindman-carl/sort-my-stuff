// types
import { Item, Unit, Collection } from "../../src/types/types";

// data
export const initialItems: Item[] = [
  {
    id: "cl8q94z3w00053b6vpj17ucbd",
    name: "Röda skor",
    unitId: "cl8q94z3w00023b6v38tpsbu1",
  },
  {
    id: "cl8q94z3w00063b6vv1rhgpd3",
    name: "Verktygslåda",
    unitId: "cl8q94z3w00023b6v38tpsbu1",
  },
  {
    id: "cl8q94z3w00073b6vpr3guj8s",
    name: "Överlevnadskit",
    unitId: "cl8q94z3w00033b6v5q49k9es",
  },
  {
    id: "cl8q94z3w00083b6vgj2om654",
    name: "Stekpanna",
    unitId: "cl8q94z3w00043b6vs0d57me2",
  },
];

export const initialUnits: Unit[] = [
  {
    id: "cl8q94z3w00023b6v38tpsbu1",
    name: "Låda nr 1",
    collectionId: "cl8q94z3w00003b6vfoqfiglh",
  },
  {
    id: "cl8q94z3w00033b6v5q49k9es",
    name: "Låda nr 2",
    collectionId: "cl8q94z3w00003b6vfoqfiglh",
  },
  {
    id: "cl8q94z3w00043b6vs0d57me2",
    name: "Lilla skoskåpet",
    collectionId: "cl8q94z3w00013b6vopf77u77",
  },
];

export const initialCollections: Collection[] = [
  {
    id: "cl8q94z3w00003b6vfoqfiglh",
    name: "Klädkammare",
  },
  {
    id: "cl8q94z3w00013b6vopf77u77",
    name: "Källaren",
  },
];
