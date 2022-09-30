import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainBody from "../components/MainBody";
import { useQuery } from "@apollo/client";
import GET__ALBUMS from "../components/albumQuery";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "../Context/dataContext";
import { useMoralis } from "react-moralis";

const Home: NextPage = () => {
  const { data: albums } = useQuery(GET__ALBUMS);
  const { setAllAlbums } = useContext(dataContext);
  const { chainId, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    albums && setAllAlbums(albums.albums);
  }, [albums, isWeb3Enabled]);

  return (
    <div className="grid  max-h-screen grid-cols-4 md:grid-cols-12 xl:grid-cols-12 gap-[8px] md:gap-[16px] xl:gap-[24px] h-screen bg-bodyColor-700">
      <Head>
        <title>Spotify-Web3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <main className=" flex flex-col col-span-4 md:col-span-12 lg:col-span-9 xl:col-span-9 text-white row-span-6">
        <Header />
        {Number(chainId).toString() == "5" ? (
          <MainBody />
        ) : (
          <h1 className="text-4xl col text-center text-white">
            Please Switch to Goerli
          </h1>
        )}
      </main>
    </div>
  );
};

export default Home;
