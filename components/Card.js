import React from "react";
import Image from "next/image";
import songImage from "../public/Laal-Ishq-Cover.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Router from "next/router";
import { useWeb3Contract } from "react-moralis";
import { abi } from "../utils/address";
import { useMoralis } from "react-moralis";
import { useEffect, useState, useContext } from "react";
import { dataContext } from "../Context/dataContext";
import useIPFS from "./useIPFS";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Card = ({ albumAddress, albumName, songsCount }) => {
  const { isWeb3Enabled } = useMoralis();
  const [artistImage, setArtistImage] = useState("");
  const { setActiveAlbumData } = useContext(dataContext);

  const { runContractFunction: getArtistImage } = useWeb3Contract({
    abi: abi,
    functionName: "getArtistImage",
    contractAddress: albumAddress,
  });

  useEffect(() => {
    async function getData() {
      await getArtistImage({
        onSuccess: async (data) => {
          let image = await useIPFS(data.toString());
          setArtistImage(image);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }

    getData();
  }, [isWeb3Enabled]);

  return (
    <div className="bg-cardColor col-span-1 rounded-md flex flex-col relative group justify-center p-4 hover:bg-cardHover transition-colors cursor-pointer">
      <div className="rounded-md overflow-hidden relative w-full h-[200px]  ">
        {!artistImage ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin w-fit h-fit text-white text-3xl">
              <AiOutlineLoading3Quarters />
            </div>
          </div>
        ) : (
          <Image src={artistImage} layout={"fill"} objectFit={"contain"} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-white">
          {albumName ? albumName : "Loading..."}
        </p>
        <p className="text-sm text-sidebarFont-300 font-semibold">
          Chill you mood with {albumName}
        </p>
      </div>
      <button
        onClick={(e) => {
          setActiveAlbumData({
            address: albumAddress,
            totalSongs: songsCount,
            artistImage: artistImage,
          });
          Router.push("/Album");
        }}
        className="text-spotifyGreen text-5xl w-fit absolute right-5 bottom-[76px] bg-bodyColor-700 hidden rounded-full group-hover:block  transition-all animate-moveToUp"
      >
        <BsFillPlayCircleFill />
      </button>
    </div>
  );
};

export default Card;
