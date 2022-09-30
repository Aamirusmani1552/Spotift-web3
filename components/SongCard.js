import React, { useEffect, useState } from "react";
import Image from "next/image";
import songImage from "../public/Laal-Ishq-Cover.png";
import useIPFS from "./useIPFS";

const SongCard = ({ image, artist, songName, songDuration, songNumber }) => {
  const [songCoverImage, setSongCoverImage] = useState("");

  useEffect(() => {
    async function getURL() {
      const imageUrl = await useIPFS(image);
      setSongCoverImage(imageUrl);
    }
    image && getURL();
  }, [image]);

  return (
    <div className="flex justify-between items-center cursor-pointer rounded-md text-sidebarFont-300 md:px-4 py-2 px-2 hover:bg-songCardHover">
      <div className="flex items-center gap-2 w-[220px]">
        <span>{songNumber + 1}</span>
        <div className="w-[50px] h-[50px] relative">
          {songCoverImage && (
            <Image
              src={songCoverImage}
              layout={"fill"}
              className="object-contains"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="text-white">{songName}</span>
          <span>{artist}</span>
        </div>
      </div>

      <div className="hidden md:block">{songName}</div>
      <div className="">{songDuration.replace("-", ":")}</div>
    </div>
  );
};

export default SongCard;
