import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import cuid from "cuid";

// components
import List from "../components/List";
import FloatingAddButton from "../components/FloatingAddButton";
import BottomDrawer from "../components/BottomDrawer/BottomDrawer";
import AppBar from "../components/AppBar/AppBar";
import CollectionForm from "../components/BottomDrawer/CollectionForm";
import UnitForm from "../components/BottomDrawer/UnitForm";

// types
import type { NextPage } from "next";
import type { Action } from "../components/FloatingAddButton/FloatingAddButton";
import { Stuff } from "../types/types";
import { Collection, Item, Unit } from "@prisma/client";

// icons
import { BsBoxSeam, BsDoorOpenFill } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import ItemForm from "../components/BottomDrawer/ItemForm";

enum FormEnum {
  Collection,
  Unit,
  Item,
}

const Home: NextPage = () => {
  const { data: initialData } = trpc.useQuery(["main.getStuff"]);

  const [data, setData] = useState<Stuff | undefined>();
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<FormEnum>(FormEnum.Collection);
  const toggleBottomDrawer = () => setBottomDrawerOpen((prev) => !prev);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const actions: Action[] = [
    {
      label: "Item",
      icon: <SiBookstack />,
      onClick: () => {
        setBottomDrawerOpen(true);
        setCurrentForm(FormEnum.Item);
      },
    },
    {
      label: "Unit",
      icon: <BsBoxSeam color={"orange"} />,
      onClick: () => {
        setBottomDrawerOpen(true);
        setCurrentForm(FormEnum.Unit);
      },
    },
    {
      label: "Collection",
      icon: <BsDoorOpenFill color={"green"} />,
      onClick: () => {
        setBottomDrawerOpen(true);
        setCurrentForm(FormEnum.Collection);
      },
    },
  ];

  const submitCollection = ({ name }: { name: string }) => {
    // abort if no data loaded
    if (!data) return;

    // create new collection
    const id = cuid();

    const newCollection: Collection = {
      id,
      name,
      type: "COLLECTION",
      unitIds: [],
    };

    // add collection to data
    const newCollections = [...data.collections, newCollection];
    const newData = {
      ...data,
      collections: newCollections,
    };
    setData(newData);

    // toggle drawer
    toggleBottomDrawer();
  };

  const submitUnit = ({
    name,
    collectionId,
  }: {
    name: string;
    collectionId: string;
  }) => {
    // check for data
    if (!data) return;

    // create new unit
    const id = cuid();

    const newUnit: Unit = {
      id,
      name,
      type: "UNIT",
      itemIds: [],
    };

    // get old collection
    if (!collectionId) return;
    const oldCollection = data.collections.find((el) => el.id === collectionId);
    if (!oldCollection) return;

    // add unit to collection
    const newCollection: Collection = {
      ...oldCollection,
      unitIds: [...oldCollection.unitIds, newUnit.id] || [newUnit.id],
    };
    // update collections and sort
    const collectionOrder = data.collections.map((el) => el.id);
    const newCollections = [
      ...data.collections.filter((el) => el.id !== collectionId),
      newCollection,
    ].sort(
      (a, z) => collectionOrder.indexOf(a.id) - collectionOrder.indexOf(z.id)
    );
    // set data
    const newData = {
      ...data,
      units: [...data.units, newUnit],
      collections: newCollections,
    };
    setData(newData);
  };

  const submitItem = ({ name, unitId }: { name: string; unitId: string }) => {
    if (!data) return;

    // create new item
    const id = cuid();

    const newItem: Item = {
      id,
      name,
      type: "ITEM",
    };

    // add item to unit
    // get unit
    const oldUnit = data.units.find((el) => el.id === unitId);
    if (!oldUnit) return;

    // add item to unit
    const newUnit: Unit = {
      ...oldUnit,
      itemIds: [...oldUnit.itemIds, newItem.id] || [newItem.id],
    };

    // update units
    const newUnits = [...data.units.filter((el) => el.id !== unitId), newUnit];

    // set data
    const newData = {
      ...data,
      units: newUnits,
      items: [...data.items, newItem],
    };

    setData(newData);
  };

  return (
    <>
      <Head>
        <title>Sort My Stuff</title>
        <meta name="description" content="sort my stuff web app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <AppBar />
        <div className="flex flex-col items-center justify-start">
          {data && data.items && data.units && data.collections ? (
            <>
              <List
                data={data}
                setData={setData}
                addItemOnClick={() => console.log("add item onclick")}
              />
              <BottomDrawer
                open={bottomDrawerOpen}
                onClose={toggleBottomDrawer}
              >
                {currentForm === FormEnum.Collection && (
                  <CollectionForm submit={submitCollection} />
                )}
                {currentForm === FormEnum.Unit && (
                  <UnitForm
                    submit={submitUnit}
                    collections={data.collections}
                  />
                )}
                {currentForm === FormEnum.Item && (
                  <ItemForm submit={submitItem} units={data.units} />
                )}
              </BottomDrawer>
              <FloatingAddButton actions={actions} />
            </>
          ) : (
            <div className="mt-64">
              <Image
                src="/tail-spin.svg"
                alt="loading indicator"
                height={64}
                width={64}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
