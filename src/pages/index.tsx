import { useState } from "react";
import Head from "next/head";
import { trpc } from "../utils/trpc";

import List from "../components/List";
import FloatingAddButton from "../components/FloatingAddButton";
import AddDrawer from "../components/AddDrawer/AddDrawer";

// types
import type { NextPage } from "next";
import type { Action } from "../components/FloatingAddButton/FloatingAddButton";
import { Collection, Unit } from "@prisma/client";

// icons
import { BsBoxSeam, BsDoorOpenFill } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["main.getStuff"]);

  const [addDrawerOpen, setAddDrawerOpen] = useState<boolean>(false);
  const [currentParents, setCurrentParents] = useState<
    (Collection | Unit)[] | undefined
  >();
  // const [currentParent, setCurrentParent] = useState<
  //   Unit | Collection | undefined
  // >();

  const toggleAddDrawer = () => setAddDrawerOpen((prev) => !prev);

  const addItemOnClick = () => {
    setCurrentParents(data?.units);
    setAddDrawerOpen(true);
  };
  const addUnitOnClick = () => {
    setCurrentParents(data?.collections);
    setAddDrawerOpen(true);
  };
  const addCollectionOnClick = () => {
    setCurrentParents(undefined);
    setAddDrawerOpen(true);
  };

  const actions: Action[] = [
    {
      label: "Item",
      icon: <SiBookstack />,
      onClick: addItemOnClick,
      parents: data?.units,
    },
    {
      label: "Unit",
      icon: <BsBoxSeam color={"orange"} />,
      onClick: addUnitOnClick,
      parents: data?.collections,
    },
    {
      label: "Collection",
      icon: <BsDoorOpenFill color={"green"} />,
      onClick: addCollectionOnClick,
      parents: undefined,
    },
  ];

  return (
    <>
      <Head>
        <title>SORT MY STUFF</title>
        <meta name="description" content="sort my stuff web app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <div className="flex flex-col items-center justify-start">
          {data && data.items && data.units && data.collections ? (
            <>
              <List initialData={data} addItemOnClick={addItemOnClick} />
              <AddDrawer
                open={addDrawerOpen}
                onClose={toggleAddDrawer}
                parents={currentParents}
              />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <FloatingAddButton actions={actions} />
      </main>
    </>
  );
};

export default Home;
