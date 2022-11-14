import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

// components
import CollectionComponent from "./Collection";

import { Collection, Unit } from "@prisma/client";
import { Stuff } from "../../types/types";
import { trpc } from "../../utils/trpc";

// test data
// import { initialData } from "./test-data";

type ListProps = {
  data: Stuff;
  setData: React.Dispatch<Stuff>;
  addItemOnClick: () => void;
};

const List: React.FC<ListProps> = ({ data, setData, addItemOnClick }) => {
  // mutations
  const updateUnitsOrder = trpc.useMutation(["main.updateUnitsOrder"]);
  const updateCollectionsOrder = trpc.useMutation([
    "main.updateCollectionsOrder",
  ]);
  const updateItemsOrder = trpc.useMutation(["main.updateItemsOrder"]);
  const updateUnitCollectionId = trpc.useMutation([
    "main.updateUnitCollectionId",
  ]);
  const updateItemUnitId = trpc.useMutation(["main.updateItemUnitId"]);

  const handleOnDragEnd = ({
    destination,
    source,
    draggableId,
    type,
  }: DropResult) => {
    // dropped outside of an droppable container
    if (!destination) {
      return;
    }
    // dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // moving collections
    if (type === "collection") {
      const newCollectionOrder = data.collections.map((el) => el.id);
      newCollectionOrder.splice(source.index, 1);
      newCollectionOrder.splice(destination.index, 0, draggableId);
      const newCollections = [...data.collections].sort(
        (a, z) =>
          newCollectionOrder.indexOf(a.id) - newCollectionOrder.indexOf(z.id)
      );

      const newData = {
        ...data,
        collections: newCollections,
      };
      setData(newData);
      updateCollectionsOrder.mutate({
        newCollectionsOrder: newCollectionOrder,
      });
      return;
    }

    // moving units
    if (type === "unit") {
      // get source collection
      const sourceCollection = data.collections.find(
        (el) => el.id === source.droppableId
      );
      if (!sourceCollection) return;

      // get destination collection
      const destinationCollection = data.collections.find(
        (el) => el.id === destination.droppableId
      );
      if (!destinationCollection) return;

      // move unit within collection
      if (sourceCollection.id === destinationCollection.id) {
        let newUnitsOrder;
        // update unit ids
        if (
          !sourceCollection.unitsOrder ||
          sourceCollection.unitsOrder.length === 0
        ) {
          // create order from units
          newUnitsOrder = data.units
            .filter((el) => el.collectionId === sourceCollection.id)
            .map((el) => el.id);
        } else {
          // if there is already an order
          newUnitsOrder = [...sourceCollection.unitsOrder];
          newUnitsOrder.splice(source.index, 1);
          newUnitsOrder.splice(destination.index, 0, draggableId);
        }

        // update collection
        const newCollection: Collection = {
          ...sourceCollection,
          unitsOrder: newUnitsOrder,
        };
        // update units and sort by unitOrder array
        const collectionOrder = data.collections.map((el) => el.id);
        const newCollections = [
          ...data.collections.filter((el) => el.id !== newCollection.id),
          newCollection,
        ].sort(
          (a, z) =>
            collectionOrder.indexOf(a.id) - collectionOrder.indexOf(z.id)
        );

        const newData = {
          ...data,
          collections: newCollections,
        };
        setData(newData);
        updateUnitsOrder.mutate({
          collectionId: sourceCollection.id,
          newUnitsOrder,
        });

        return;
      }

      // move unit between collections
      // update source collection
      const newSourceUnitsOrder = [...sourceCollection.unitsOrder];
      newSourceUnitsOrder.splice(source.index, 1); // remove item from sourceCollection
      const newSourceCollection: Collection = {
        ...sourceCollection,
        unitsOrder: newSourceUnitsOrder,
      };
      // update destination collection
      const newDestinationUnitsOrder = [...destinationCollection.unitsOrder];
      newDestinationUnitsOrder.splice(destination.index, 0, draggableId);
      const newDestinationCollection: Collection = {
        ...destinationCollection,
        unitsOrder: newDestinationUnitsOrder,
      };
      // update collections and sort by collectionOrder
      const collectionOrder = data.collections.map((el) => el.id);
      const newCollections = [
        ...data.collections.filter(
          (el) =>
            el.id !== newSourceCollection.id &&
            el.id !== newDestinationCollection.id
        ),
        newDestinationCollection,
        newSourceCollection,
      ].sort(
        (a, z) => collectionOrder.indexOf(a.id) - collectionOrder.indexOf(z.id)
      );

      // update unit
      const unitToUpdate = data.units.find((el) => el.id === draggableId);
      if (!unitToUpdate) return;

      unitToUpdate.collectionId = destinationCollection.id;
      const newUnits = [
        ...data.units.filter((el) => el.id !== unitToUpdate.id),
        unitToUpdate,
      ];

      // update state
      const newData = {
        ...data,
        units: newUnits,
        collections: newCollections,
      };
      setData(newData);
      console.log("source:", newSourceUnitsOrder);
      console.log("destination:", newDestinationUnitsOrder);

      // mutate db
      updateUnitCollectionId.mutate({
        unitId: unitToUpdate.id,
        newCollectionId: destinationCollection.id,
      });
      updateUnitsOrder.mutate({
        collectionId: sourceCollection.id,
        newUnitsOrder: newSourceUnitsOrder,
      });
      updateUnitsOrder.mutate({
        collectionId: destinationCollection.id,
        newUnitsOrder: newDestinationUnitsOrder,
      });

      return;
    }

    // moving items
    // get source unit
    const sourceUnit = data.units.find((el) => el.id === source.droppableId);
    if (!sourceUnit) return;
    // get destination unit
    const destinationUnit = data.units.find(
      (el) => el.id === destination.droppableId
    );
    if (!destinationUnit) return;

    // move item within unit
    if (sourceUnit === destinationUnit) {
      let newItemsOrder;

      // update item ids
      if (!sourceUnit.itemsOrder || sourceUnit.itemsOrder.length === 0) {
        // create order from items
        newItemsOrder = data.items
          .filter((el) => el.unitId === sourceUnit.id)
          .map((el) => el.id);
      } else {
        // if there is already an order mutate order
        newItemsOrder = [...sourceUnit.itemsOrder];
        newItemsOrder.splice(source.index, 1);
        newItemsOrder.splice(destination.index, 0, draggableId);
      }

      // update unit
      const newUnit: Unit = {
        ...sourceUnit,
        itemsOrder: newItemsOrder,
      };
      // update units and sort by restoring unitOrder array
      const unitOrder = data.units.map((el) => el.id); // keep track of unit order
      const newUnits = [
        ...data.units.filter((el) => el.id !== newUnit.id),
        newUnit,
      ].sort((a, z) => unitOrder.indexOf(a.id) - unitOrder.indexOf(z.id));

      // set state
      const newData = {
        ...data,
        units: newUnits,
      };
      setData(newData);
      // mutate db
      updateItemsOrder.mutate({ newItemsOrder, unitId: newUnit.id });
      return;
    }

    // move item between units
    // update source unit
    const newSourceItemsOrder = [...sourceUnit.itemsOrder];
    newSourceItemsOrder.splice(source.index, 1);
    const newSourceUnit: Unit = {
      ...sourceUnit,
      itemsOrder: newSourceItemsOrder,
    };
    // update destination unit
    const newDesitinationItemsOrder = [...destinationUnit.itemsOrder];
    newDesitinationItemsOrder.splice(destination.index, 0, draggableId);
    const newDestinationUnit: Unit = {
      ...destinationUnit,
      itemsOrder: newDesitinationItemsOrder,
    };

    // update units
    const newUnits = [
      ...data.units.filter(
        (el) => el.id !== newSourceUnit.id && el.id !== newDestinationUnit.id
      ),
      newDestinationUnit,
      newSourceUnit,
    ];

    // update item
    const itemToUpdate = data.items.find((el) => el.id === draggableId);
    if (!itemToUpdate) return;

    itemToUpdate.unitId = destinationUnit.id;
    const newItems = [
      ...data.items.filter((el) => el.id !== itemToUpdate.id),
      itemToUpdate,
    ];

    // update state
    const newData = {
      ...data,
      units: newUnits,
      items: newItems,
    };
    setData(newData);

    // mutate db
    updateItemUnitId.mutate({
      itemId: itemToUpdate.id,
      newUnitId: itemToUpdate.unitId,
    });
    updateItemsOrder.mutate({
      unitId: sourceUnit.id,
      newItemsOrder: newSourceItemsOrder,
    });
    updateItemsOrder.mutate({
      unitId: destinationUnit.id,
      newItemsOrder: newDesitinationItemsOrder,
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          droppableId="all-units"
          type="collection"
          direction="vertical"
        >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {data.collections.map(({ id }, index) => {
                const collection = data.collections.find((el) => el.id === id);

                if (!collection) {
                  return <>{id} not found</>;
                }

                const units = data.units.filter(
                  (el) => el.collectionId === collection.id
                );

                if (collection.unitsOrder.length > 0) {
                  units.sort(
                    (a, z) =>
                      collection.unitsOrder.indexOf(a.id) -
                      collection.unitsOrder.indexOf(z.id)
                  );
                }

                return (
                  <CollectionComponent
                    key={collection.id}
                    collection={collection}
                    units={units}
                    index={index}
                    items={data.items}
                    addItemOnClick={addItemOnClick}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default List;
