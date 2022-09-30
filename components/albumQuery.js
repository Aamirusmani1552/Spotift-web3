import { gql } from "@apollo/client";

const GET__ALBUMS = gql`
  {
    albums(orderBy: albumId) {
      id
      albumId
      owner
      albumAddress
      albumName
      songsCount
      timeStamp
    }
  }
`;

export default GET__ALBUMS;
