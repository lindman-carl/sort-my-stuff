// export type Item = {
//   id: string;
//   name: string;
//   unitId: string;
// };

// export type Unit = {
//   id: string;
//   name: string;
//   items?: string[];
//   collectionId: string;
// };

// export type Collection = {
//   id: string;
//   name: string;
//   units?: string[];
// };
import { Item, Unit, Collection, User } from "@prisma/client";

export type Stuff = {
  items: Item[];
  units: Unit[];
  collections: Collection[];
  user: User;
};
