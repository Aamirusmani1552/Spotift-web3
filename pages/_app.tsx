import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import DataContext from "../Context/dataContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import CreatePlayer from "../components/CreatePlayer";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_GRAPH_URI,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
        <DataContext>
          <Component {...pageProps} />
          <CreatePlayer />
        </DataContext>
      </ApolloProvider>
    </MoralisProvider>
  );
}

export default MyApp;
