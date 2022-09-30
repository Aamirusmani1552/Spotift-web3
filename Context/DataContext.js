import { createContext, useState } from "react";
import React from "react";

export const dataContext = createContext();

const DataContext = ({ children }) => {
  const [activeAlbumData, setActiveAlbumData] = useState({});
  const [allAlbums, setAllAlbums] = useState([]);
  const [songsInfo, setSongsInfo] = useState([]);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [albumToPlay, setAlbumToPlay] = useState([]);
  const [fetching, setFetching] = useState(false);

  return (
    <dataContext.Provider
      value={{
        activeAlbumData,
        setActiveAlbumData,
        allAlbums,
        setAllAlbums,
        songsInfo,
        setSongsInfo,
        openPlayer,
        setOpenPlayer,
        albumToPlay,
        setAlbumToPlay,
        fetching,
        setFetching,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default DataContext;
