import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import songImage from "../public/Laal-Ishq-Cover.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import SongCard from "./songCard";
import { dataContext } from "../Context/dataContext";

const MainAlbum = ({ songs, coverImage, albumAddress }: any) => {
  const { setOpenPlayer, setAlbumToPlay, fetching } = useContext(dataContext);
  return (
    <>
      <section className="bg-mainBodyColor-400  overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 flex-1 p-6 flex flex-col gap-8">
        <div>
          <div className="flex flex-col md:flex-row gap-[32px] ">
            <div className="w-full h-[250px] md:w-[220px] md:h-[220px] relative  overflow-hidden">
              <Image
                src={coverImage}
                id={"Album-cover"}
                layout={"fill"}
                objectFit={"contain"}
              />
            </div>
            <div className="flex flex-col flex-1 gap-7 justify-end">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-semibold text-white">
                {songs.length > 0 && !fetching && songs[0]?.artist}
              </h1>
              <p className="text-sm lg:mt-[32px] font-bold text-sidebarFont-300 ">
                Get happy with today's dose of feel-good songs!
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <button
            onClick={() => {
              setAlbumToPlay(songs);
              setOpenPlayer(true);
            }}
            className="text-spotifyGreen bg-sidebarColor-800 text-6xl rounded-full hover:scale-[105%] transition-all"
          >
            <BsFillPlayCircleFill />
          </button>
          <button className="rounded-full border-[3px] border-sidebarFont-300 hover:border-white px-6 py-3 text-sidebarFont-300 hover:text-white flex gap-1 items-center justify-center transition-colors font-bold">
            <a
              href={`https://goerli.etherscan.io/address/${albumAddress}`}
              target={"_blank"}
              className={"flex items-center justify-center gap-2"}
            >
              <span>Etherscan</span> <FiArrowUpRight />
            </a>
          </button>
        </div>

        <div className="mb-[100px]">
          <div className="md:flex hidden text-sidebarFont-300 font-semibold mb-[8px] items-center justify-between px-[16px]">
            <div className="w-[220px]"># Title</div>
            <span>Album</span>
            <span>
              <BiTimeFive />
            </span>
          </div>

          <hr className="border-[#3e3d3d] mb-[8px]" />
          <div className="flex flex-col">
            {songs?.length > 0 && !fetching ? (
              songs.map((song: any, i: any) => {
                return (
                  <SongCard
                    image={song.image}
                    songName={song.name}
                    artist={song.artist}
                    songDuration={song.duration}
                    key={i}
                    songNumber={i}
                  />
                );
              })
            ) : (
              <div className="col-span-1 md:col-span-3 xl:col-span-4 flex items-center justify-center h-[300px]">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-4  border-sidebarFont-300 border-b-transparent animate-spin rounded-full text-center"></div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainAlbum;
