import React from "react";
import { BsSpotify } from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
import { SiLibrariesdotio } from "react-icons/si";
import Link from "next/link";

const Sidebar = () => {
  return (
    <section className="lg:col-span-3 max-h-screen hidden  bg-sidebarColor-800 lg:flex flex-col p-6">
      <div className="text-[#FFFEFE] text-5xl flex gap-2 items-center ">
        <BsSpotify />
        <span className="font-semibold text-2xl">Spotify</span>
      </div>

      <div className="mt-[32px] text-sidebarFont-300 font-semibold flex flex-col gap-4">
        <Link href={"/"}>
          <div className="text-2xl gap-2 items-center flex  transition-colors hover:text-white cursor-pointer">
            <MdHomeFilled />
            <span className="text-[14px]">Home</span>
          </div>
        </Link>
        <div className="text-2xl gap-2 hover:text-white items-center flex transition-colors cursor-not-allowed">
          <SiLibrariesdotio />
          <span className="text-[14px]">My Library</span>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
