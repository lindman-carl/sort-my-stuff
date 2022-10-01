export type Item = {
  id: string;
  name: string;
  unit: Unit;
  unitId: string;
};

export type Unit = {
  id: string;
  name: string;
  items: string[];
  collection: Collection;
  collectionId: string;
};

export type Collection = {
  id: string;
  name: string;
  units: string[];
};
