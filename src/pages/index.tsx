import Head from "next/head";
import { trpc } from "../utils/trpc";

// types
import type { NextPage } from "next";

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
        <div>{data ? <div>{JSON.stringify(data)}</div> : <p>Loading..</p>}</div>
      </main>
    </>
  );
};

export default Home;
