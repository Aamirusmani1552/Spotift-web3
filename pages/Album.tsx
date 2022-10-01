import React, { useContext, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainAlbum from "../components/MainAlbum";
import { dataContext } from "../Context/DataContext";
import { useWeb3Contract } from "react-moralis";
import { abi } from "../utils/address";
import axios from "axios";
import { useMoralis } from "react-moralis";

const Album = () => {
  const { activeAlbumData, songsInfo, setSongsInfo, setFetching } =
    useContext(dataContext);
  const { chainId, isWeb3Enabled } = useMoralis();

  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: abi,
    functionName: "tokenURI",
    contractAddress: activeAlbumData.address,
  });

  async function getSongsInfo(albumURIs: any) {
    let sInfo: any = [];
    for (let i = 0; i < albumURIs.length; i++) {
      const url = "https://gateway.pinata.cloud/ipfs/" + albumURIs[i];
      const info = await axios.get(url);
      sInfo.push(info.data);
    }
    setSongsInfo(sInfo);
    return sInfo;
  }

  useEffect(() => {
    async function getSongs() {
      setFetching(true);
      const uris: any = [];
      for (let i = 0; i < Number(activeAlbumData.totalSongs); i++) {
        await getTokenURI({
          onSuccess: (data: any) => {
            uris.push(data.toString());
          },
          onError: (err) => {
            console.log(err);
          },
          params: {
            params: {
              tokenId: i.toString(),
            },
          },
        });
      }
      let info = await getSongsInfo(uris);
      setFetching(false);
    }
    getSongs();
  }, [isWeb3Enabled]);

  if (Object.keys(activeAlbumData).length <= 0) {
    return <h1 style={{ fontSize: "20px" }}>Page Not Found</h1>;
  }

  return (
    <div className="grid relative grid-rows-6 max-h-screen grid-cols-4 md:grid-cols-12 xl:grid-cols-12 gap-[8px] md:gap-[16px] xl:gap-[24px] h-screen bg-bodyColor-700">
      <Head>
        <title>Spotify-Web3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <main className=" flex flex-col col-span-4 md:col-span-12 lg:col-span-9 xl:col-span-9 text-white row-span-6">
        <Header />
        {Number(chainId).toString() === "5" ? (
          <MainAlbum
            songs={songsInfo}
            coverImage={activeAlbumData.artistImage}
            albumAddress={activeAlbumData.address}
          />
        ) : (
          <h1 className="text-4xl col text-center text-white">
            Please Switch to Goerli
          </h1>
        )}
      </main>
    </div>
  );
};

export default Album;
