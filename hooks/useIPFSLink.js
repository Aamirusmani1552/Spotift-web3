const useIPFSLink = () => {
  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  };

  return { resolveLink };
};

export default useIPFSLink;
