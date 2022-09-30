import { useRef, useEffect, useState } from "react";
import useIPFSLink from "./useIPFSLink";

const useAudio = (album) => {
  if (album.length <= 0) {
    return;
  }

  const { resolveLink } = useIPFSLink();
  const [audio, setAudio] = useState(album);
  const [trackIndex, setTrackIndex] = useState(0);
  const [newSong, setNewSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState();
  const [volume, setVolume] = useState(1);
  const [currentSongImageURL, setCurrentSongImageURL] = useState("");

  const songRef = useRef(new Audio(resolveLink(album[0]?.animation_url)));
  const intervalRef = useRef();
  const isReady = useRef(false);

  useEffect(() => {
    album.length > 0 &&
      setCurrentSongImageURL(resolveLink(album[trackIndex]?.image));
  }, [trackIndex, audio]);

  const { duration } = songRef.current;

  const toNextSong = () => {
    if (trackIndex < album.length - 1) {
      setTrackIndex((prev) => prev + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const toPrevSong = () => {
    if (trackIndex > 0) {
      setTrackIndex((prev) => prev - 1);
    } else {
      setTrackIndex(audio.length - 1);
    }
  };

  useEffect(() => {
    toggle();
    setAudio(album);
    if (trackIndex === 0) {
      setNewSong(newSong + 1);
    } else {
      setNewSong(0);
    }
  }, [album]);

  useEffect(() => {
    if (isPlaying) {
      songRef.current.play();
      setTimer();
    } else {
      clearInterval(intervalRef.current);
      songRef.current.pause();
    }

    return () => {
      songRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {}, []);

  useEffect(() => {
    songRef.current.pause();
    songRef.current = new Audio(resolveLink(audio[trackIndex].animation_url));
    songRef.current.volume = volume;
    setTrackProgress(Math.round(songRef.current.currentTime));
    if (isReady) {
      songRef.current.play();
      setIsPlaying(true);
      setTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex, newSong]);

  const toggle = () => setIsPlaying((prev) => !prev);

  const setTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (songRef.current.ended) {
        toNextSong();
      }
      setTrackProgress(Math.round(songRef.current.currentTime));
    }, [1000]);
  };

  const onVolume = (vol) => {
    setVolume(vol);
    songRef.current.volume = vol;
  };

  const onSearch = (value) => {
    clearInterval(intervalRef.current);
    songRef.current.currentTime = value;
    setTrackProgress(songRef.current.currentTime);
    if (!isPlaying) {
      setIsPlaying(true);
    }
    setTimer();
  };

  return [
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
  ];
};

export default useAudio;
