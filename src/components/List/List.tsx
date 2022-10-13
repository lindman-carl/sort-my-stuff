import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

// components
import Collection from "./Collection";

// test data
import { CollectionType, initialData, UnitType } from "./test-data";

const List = () => {
  const [data, setData] = useState(initialData);

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
      const newCollectionOrder = [...data.collectionOrder];
      newCollectionOrder.splice(source.index, 1);
      newCollectionOrder.splice(destination.index, 0, draggableId);
      setData((prev) => ({
        ...prev,
        collectionOrder: newCollectionOrder,
      }));
      return;
    }

    // moving units
    if (type === "unit") {
      // const newUnitOrder = [...data.unitOrder];
      // newUnitOrder.splice(source.index, 1);
      // newUnitOrder.splice(destination.index, 0, draggableId);
      // setData((prev) => ({
      //   ...prev,
      //   unitOrder: newUnitOrder,
      // }));
      // return;

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
      if (sourceCollection === destinationCollection) {
        // update unit ids
        const newUnitIds = [...sourceCollection.unitIds];
        newUnitIds.splice(source.index, 1);
        newUnitIds.splice(destination.index, 0, draggableId);
        // update unit
        const newCollection: CollectionType = {
          ...sourceCollection,
          unitIds: newUnitIds,
        };
        // update units and sort by unitOrder array
        const newCollections = [
          ...data.collections.filter((el) => el.id !== newCollection.id),
          newCollection,
        ].sort(
          (a, z) =>
            data.collectionOrder.indexOf(a.id) -
            data.collectionOrder.indexOf(z.id)
        );
        // set state
        setData((prev) => ({
          ...prev,
          collections: newCollections,
        }));
        return;
      }

      // move unit between collections
      // update source collection
      const newSourceUnitIds = [...sourceCollection.unitIds];
      newSourceUnitIds.splice(source.index, 1); // remove item from sourceCollection
      const newSourceCollection: CollectionType = {
        ...sourceCollection,
        unitIds: newSourceUnitIds,
      };
      // update destination collection
      const newDestinationUnitIds = [...destinationCollection.unitIds];
      newDestinationUnitIds.splice(destination.index, 0, draggableId);
      const newDestinationCollection: CollectionType = {
        ...destinationCollection,
        unitIds: newDestinationUnitIds,
      };
      // update collections and sort by collectionOrder
      const newCollections = [
        ...data.collections.filter(
          (el) =>
            el.id !== newSourceCollection.id &&
            el.id !== newDestinationCollection.id
        ),
        newDestinationCollection,
        newSourceCollection,
      ].sort(
        (a, z) =>
          data.collectionOrder.indexOf(a.id) -
          data.collectionOrder.indexOf(z.id)
      );
      setData((prev) => ({
        ...prev,
        collections: newCollections,
      }));

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
      console.log("same");

      // update item ids
      const newItemIds = [...sourceUnit.itemIds];
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);
      // update unit
      const newUnit: UnitType = {
        ...sourceUnit,
        itemIds: newItemIds,
      };
      // update units and sort by unitOrder array
      const unitOrder = data.units.map((el) => el.id); // keep track of unit order
      console.log("unitOrder:", unitOrder);

      const newUnits = [
        ...data.units.filter((el) => el.id !== newUnit.id),
        newUnit,
      ].sort((a, z) => unitOrder.indexOf(a.id) - unitOrder.indexOf(z.id));
      console.log("nuewUnits:", newUnits);

      // set state
      setData((prev) => ({
        ...prev,
        units: newUnits,
      }));
      return;
    }
    // move item between units
    // update source unit
    const newSourceItemIds = [...sourceUnit.itemIds];
    newSourceItemIds.splice(source.index, 1);
    const newSourceUnit: UnitType = {
      ...sourceUnit,
      itemIds: newSourceItemIds,
    };
    // update destination unit
    const newDestinationItemIds = [...destinationUnit.itemIds];
    newDestinationItemIds.splice(destination.index, 0, draggableId);
    const newDestinationUnit: UnitType = {
      ...destinationUnit,
      itemIds: newDestinationItemIds,
    };

    // update units and sort by unitOrder
    const newUnits = [
      ...data.units.filter(
        (el) => el.id !== newSourceUnit.id && el.id !== newDestinationUnit.id
      ),
      newDestinationUnit,
      newSourceUnit,
    ];
    // .sort(
    //   (a, z) => data.unitOrder.indexOf(a.id) - data.unitOrder.indexOf(z.id)
    // );
    setData((prev) => ({
      ...prev,
      units: newUnits,
    }));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="all-units" type="collection" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {data.collectionOrder.map((collectionId, index) => {
              const collection = data.collections.find(
                (el) => el.id === collectionId
              );

              if (!collection) {
                return <>{collectionId} not found</>;
              }

              const units = data.units.filter((el) =>
                collection.unitIds.includes(el.id)
              );
              const sortedUnits = [...units].sort(
                (a, z) =>
                  collection.unitIds.indexOf(a.id) -
                  collection.unitIds.indexOf(z.id)
              );

              return (
                <Collection
                  key={collection.id}
                  collection={collection}
                  units={sortedUnits}
                  index={index}
                  items={data.items}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
