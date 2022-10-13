import Head from "next/head";
import { trpc } from "../utils/trpc";

// types
import type { NextPage } from "next";
import List from "../components/List";

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

      <main className="container mx-auto flex flex-col items-center justify-start min-h-screen p-4">
        {data && data.items && data.units && data.collections ? (
          <List initialData={data} />
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  );
};

export default Home;
