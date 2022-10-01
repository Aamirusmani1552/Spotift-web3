import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import { dataContext } from "../Context/DataContext";
import Player from "./Player";

const CreatePlayer = () => {
  const { openPlayer } = useContext(dataContext);
  const { chainId } = useMoralis();
  return openPlayer && Number(chainId).toString() == "5" && <Player />;
};

export default CreatePlayer;
