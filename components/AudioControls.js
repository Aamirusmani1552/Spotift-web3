import React from "react";
import { BiSkipPrevious, BiSkipNext, BiToggleLeft } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

const AudioControls = ({ isPlaying, toPrevSong, toNextSong, toggle }) => {
  return (
    <div className="flex gap-2 items-center  w-fit">
      <button className="text-4xl" onClick={() => toPrevSong()}>
        <BiSkipPrevious />
      </button>
      <button className="text-2xl" onClick={() => toggle()}>
        {!isPlaying ? <FaPlay /> : <GiPauseButton />}
      </button>
      <button
        className="text-4xl"
        onClick={() => {
          toNextSong();
        }}
      >
        <BiSkipNext />
      </button>
    </div>
  );
};

export default AudioControls;
