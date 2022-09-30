import Image from "next/image";
import React, { useContext, useState } from "react";
import AudioControls from "../components/AudioControls";
import { HiOutlineVolumeUp } from "react-icons/hi";
import useAudio from "../hooks/useAudio";
import { dataContext } from "../Context/dataContext";
import { BiVolumeMute } from "react-icons/bi";

const Player = () => {
  const { openPlayer, albumToPlay } = useContext(dataContext);
  const [openVolume, setOpenVolume] = useState(false);

  const [
    isPlaying,
    duration,
    toggle,
    toNextSong,
    toPrevSong,
    trackProgress,
    onSearch,
    onVolume,
    trackIndex,
    volume,
    currentSongImageURL,
  ] = useAudio(albumToPlay);

  const changeTime = (value) => {
    const min = Math.floor(value / 60);
    const minValue = min < 10 ? "0" + min : min;
    const sec = Math.floor(value % 60);
    const secValue = sec < 10 ? "0" + sec : sec;

    return minValue + ":" + secValue;
  };

  return (
    openPlayer && (
      <div className="w-screen max-w-screen fixed p-2 bottom-0 flex text-white items-center justify-center gap-2  bg-musicPlayerColor ">
        <div className="w-[60px] h-[60px] object-contain relative">
          {currentSongImageURL && (
            <Image src={currentSongImageURL} layout={"fill"} />
          )}
        </div>
        <div className="md:flex flex-col text-sm hidden">
          <span className="font-bold">
            {albumToPlay.length > 0 &&
              albumToPlay[trackIndex].name.replace(".mp3", "")}
          </span>
          <span className="text-sidebarFont-300">
            {albumToPlay.length > 0 && albumToPlay[trackIndex].artist}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-[200px] md:w-[300px]  gap-2 flex flex-col items-center justify-center">
            <AudioControls
              toNextSong={toNextSong}
              toPrevSong={toPrevSong}
              isPlaying={isPlaying}
              toggle={toggle}
            />
            <div className="flex gap-2 w-full items-center justify-center text-sm">
              {changeTime(trackProgress)}
              <input
                id="default-range"
                type="range"
                className="w-full h-1 bg-gray-500  rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                max={duration ? duration : 0}
                min={0}
                value={trackProgress ? trackProgress : 0}
                step={"0.1"}
                onChange={(e) => onSearch(e.target.value)}
              />
              {albumToPlay.length > 0 &&
                albumToPlay[trackIndex].duration.replace("-", ":")}
            </div>
          </div>
        </div>

        <div className="flex gap-2 md:flex-row relative flex-col items-center w-[80px] md:w-[120px]">
          <div
            className={
              !openVolume
                ? "absolute rotate-[270deg] transition-all right-[-200%] -top-[250px] w-[200px] bg-sidebarColor-800 p-[24px] md:hidden"
                : "absolute rotate-[270deg] transition-all -top-[250px] w-[200px] bg-sidebarColor-800 p-[24px] md:hidden"
            }
          >
            <input
              type="range"
              min={0}
              max={1}
              step="0.1"
              value={volume}
              onChange={(e) => {
                onVolume(e.target.value);
              }}
              className="ml-2 h-1 bg-spotifyGreen w-full  transition-all rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
          <button
            className="md:text-xl font-bold text-2xl "
            onClick={() => {
              setOpenVolume((prev) => !prev);
            }}
          >
            {volume <= 0 ? <BiVolumeMute /> : <HiOutlineVolumeUp />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step="0.1"
            value={volume}
            onChange={(e) => onVolume(e.target.value)}
            className="ml-2 h-1 bg-spotifyGreen w-[70px] hidden md:block transition-all rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
    )
  );
};

export default Player;
