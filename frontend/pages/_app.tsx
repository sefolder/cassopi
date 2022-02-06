import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "../settings/store";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <CookiesProvider>
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </CookiesProvider>
);

export default MyApp;
