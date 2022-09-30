import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ConnectButton } from "@web3uikit/web3";
import spotifyImage from "../public/spotify-logo-png-7053.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-transparent flex items-center px-6 py-2 md:py-0 justify-between">
      <div className="lg:flex gap-2 items-center hidden ">
        <div className="text-3xl font-extralight hover:cursor-not-allowed text-sidebarFont-300">
          <IoIosArrowBack />
        </div>
        <div className="text-3xl font-extralight px-4 py-4 hover:cursor-not-allowed text-sidebarFont-300">
          <IoIosArrowForward />
        </div>
      </div>
      <Link href="/">
        <div className=" text-4xl w-[50px] h-[50px]  relative flex lg:hidden ">
          <Image
            src={spotifyImage}
            alt="spotify-image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </Link>
      <div>
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
