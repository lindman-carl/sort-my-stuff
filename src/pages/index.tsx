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
import { signIn, useSession } from "next-auth/react";

enum FormEnum {
  Collection,
  Unit,
  Item,
}

const Home: NextPage = () => {
  // trpc
  const { data: initialData } = trpc.useQuery(["main.getUserStuff"]);
  const collectionCreate = trpc.useMutation(["main.collectionCreate"]);
  const unitCreate = trpc.useMutation(["main.unitCreate"]);
  const itemCreate = trpc.useMutation(["main.itemCreate"]);
  const updateUnitsOrder = trpc.useMutation(["main.updateUnitsOrder"]);
  const updateItemsOrder = trpc.useMutation(["main.updateItemsOrder"]);

  // auth
  const { data: session } = useSession();

  // state
  const [data, setData] = useState<Stuff | undefined>();
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<FormEnum>(FormEnum.Collection);

  useEffect(() => {
    // make state from fetched data
    // this is needed to be able to update the state
    if (initialData) {
      // check unitsOrder
      if (initialData.collections) {
        // create new collectionsOrder if its not the same length as collections
        if (
          !initialData.user.collectionsOrder ||
          initialData.user.collectionsOrder.length !==
            initialData.collections.length
        ) {
          const collectionsIds = initialData.collections.map((el) => el.id);
          initialData.user.collectionsOrder = collectionsIds;
        }

        // sort collections by collectionsOrder
        initialData.collections.sort(
          (a, z) =>
            initialData.user.collectionsOrder.indexOf(a.id) -
            initialData.user.collectionsOrder.indexOf(z.id)
        );

        for (const collection of initialData.collections) {
          if (collection.unitsOrder.length === 0) {
            const unitsOrder = initialData.units
              .filter((el) => el.collectionId === collection.id) // filter by collection id
              .map((el) => el.id); // return unit id

            collection.unitsOrder = unitsOrder;
            console.log(unitsOrder);
          }
        }
      }

      // check items order
      for (const unit of initialData.units) {
        if (unit.itemsOrder.length === 0) {
          const itemsOrder = initialData.items
            .filter((el) => el.unitId === unit.id)
            .map((el) => el.id);

          unit.itemsOrder = itemsOrder;
          console.log(itemsOrder);
        }
      }

      setData(initialData);
      console.log(initialData);
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

  // functions
  const toggleBottomDrawer = () => setBottomDrawerOpen((prev) => !prev);

  const saveOrder = () => {
    if (data?.collections && data.units) {
      for (const collection of data?.collections) {
        const unitsOrder = data.units
          .filter((el) => el.collectionId === collection.id)
          .map((el) => el.id);

        updateUnitsOrder.mutate({
          collectionId: collection.id,
          newUnitsOrder: unitsOrder,
        });
      }
    }

    if (data?.units && data?.items) {
      for (const unit of data?.units) {
        const itemsOrder = data.items
          .filter((el) => el.unitId === unit.id)
          .map((el) => el.id);

        updateItemsOrder.mutate({
          unitId: unit.id,
          newItemsOrder: itemsOrder,
        });
      }
    }
  };

  // submit handlers
  const submitCollection = async ({ name }: { name: string }) => {
    // abort if no data loaded
    if (!data) return;

    // check for user session
    if (!session || !session?.user?.id) return;

    // create new collection
    const id = cuid();

    const newCollection: Collection = {
      id,
      name,
      type: "COLLECTION",
      userId: session.user.id,
      unitsOrder: [],
    };

    // add collection to data
    const newCollections = [...data.collections, newCollection];
    const newData = {
      ...data,
      collections: newCollections,
    };
    setData(newData);

    // do db stuff
    collectionCreate.mutate({ name, id });
    // TODO: Provide feedback to user

    // close drawer
    setBottomDrawerOpen(false);
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

    // check for user session
    if (!session || !session?.user?.id) return;

    // create new unit
    const id = cuid();

    const newUnit: Unit = {
      id,
      name,
      type: "UNIT",
      userId: session.user.id,
      itemsOrder: [],
      collectionId,
    };

    // get old collection
    if (!collectionId) return;
    const oldCollection = data.collections.find((el) => el.id === collectionId);
    if (!oldCollection) return;

    // set data
    const newData = {
      ...data,
      units: [...data.units, newUnit],
      // collections: newCollections,
    };
    setData(newData);

    // do db stuff
    unitCreate.mutate({
      name,
      id,
      collectionId,
      unitsOrder: [id, ...oldCollection.unitsOrder],
    });
    // TODO: Provide feedback to user

    // close drawer
    setBottomDrawerOpen(false);
  };

  const submitItem = ({ name, unitId }: { name: string; unitId: string }) => {
    if (!data) return;

    // check for user session
    if (!session || !session?.user?.id) return;

    // create new item
    const id = cuid();

    const newItem: Item = {
      id,
      name,
      type: "ITEM",
      userId: session.user.id,
      unitId,
    };

    // add item to unit
    // get unit
    // const oldUnit = data.units.find((el) => el.id === unitId);
    // if (!oldUnit) return;

    // // add item to unit
    // const newUnit: Unit = {
    //   ...oldUnit,
    //   itemIds: [...oldUnit.itemIds, newItem.id] || [newItem.id],
    // };

    // // update units
    // const newUnits = [...data.units.filter((el) => el.id !== unitId), newUnit];

    // set data
    const newData = {
      ...data,
      items: [...data.items, newItem],
    };

    setData(newData);

    // do db stuff
    itemCreate.mutate({
      name,
      id,
      unitId,
    });
    // TODO: Provide feedback to user

    // close drawer
    setBottomDrawerOpen(false);
  };

  // check auth
  if (!session) {
    return (
      <div>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Sort My Stuff</title>
        <meta name="description" content="sort my stuff web app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <AppBar saveOrder={saveOrder} />
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
