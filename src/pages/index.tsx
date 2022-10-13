import Head from "next/head";
import { trpc } from "../utils/trpc";

import List from "../components/List";
import FloatingAddButton from "../components/FloatingAddButton";

// types
import type { NextPage } from "next";
import type { Action } from "../components/FloatingAddButton/FloatingAddButton";

// icons
import { BsBoxSeam, BsDoorOpenFill } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";

const actions: Action[] = [
  { label: "Item", icon: <SiBookstack />, onClick: () => console.log("Item") },
  {
    label: "Unit",
    icon: <BsBoxSeam color={"orange"} />,
    onClick: () => console.log("Unit"),
  },
  {
    label: "Collection",
    icon: <BsDoorOpenFill color={"green"} />,
    onClick: () => console.log("Collection"),
  },
];

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["main.getStuff"]);
  console.log(data);

  return (
    <>
      <Head>
        <title>SORT MY STUFF</title>
        <meta name="description" content="sort my stuff web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-start">
        {data && data.items && data.units && data.collections ? (
          <List initialData={data} />
        ) : (
          <p>Loading...</p>
        )}
        <FloatingAddButton actions={actions} />
      </main>
    </>
  );
};

export default Home;
