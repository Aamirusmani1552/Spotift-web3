export default async function useIPFS(imageURL) {
  let newImageURL;
  newImageURL = imageURL.toString().replace("ipfs://", "https://ipfs.io/ipfs/");

  return newImageURL;
}
