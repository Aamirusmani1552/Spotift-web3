import React, { useContext } from "react";
import Card from "./Card";
import { albumAddresses } from "../utils/address";
import { dataContext } from "../Context/DataContext";

const MainBody = () => {
  const { allAlbums } = useContext(dataContext);

  return (
    <section className="bg-mainBodyColor-400 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 flex-1 p-6">
      <h1 className="text-white text-2xl font-bold">Spotify Playlists</h1>
      <main className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 mt-[32px]">
        {allAlbums.length > 0 ? (
          allAlbums.map((album, i) => (
            <Card
              albumAddress={album.albumAddress}
              songsCount={album.songsCount}
              albumName={album.albumName}
              key={album.id}
            />
          ))
        ) : (
          <div className="col-span-1 md:col-span-3 xl:col-span-4 flex items-center justify-center h-[300px]">
            <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-4  border-sidebarFont-300 border-b-transparent animate-spin rounded-full text-center"></div>
          </div>
        )}
      </main>
    </section>
  );
};

export default MainBody;
