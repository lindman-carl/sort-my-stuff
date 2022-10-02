import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const items = trpc.useQuery(["main.getAllItems"]);
  const units = trpc.useQuery(["main.getAllUnits"]);
  const collections = trpc.useQuery(["main.getAllCollections"]);

  return (
    <>
      <Head>
        <title>SORT MY STUFF</title>
        <meta name="description" content="sort my stuff web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-start min-h-screen p-4">
        <div>
          {items && units && collections ? (
            <div>
              <ol>
                {items.data?.map((el) => (
                  <li key={el.id}>{el.name}</li>
                ))}
              </ol>
              <ol>
                {units.data?.map((el) => (
                  <li key={el.id}>{el.name}</li>
                ))}
              </ol>
              <ol>
                {collections.data?.map((el) => (
                  <li key={el.id}>{el.name}</li>
                ))}
              </ol>
            </div>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
