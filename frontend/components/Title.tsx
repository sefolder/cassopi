import Head from "next/head";

const Title = ({ children }: { children: string }) => (
  <Head>
    <title>{children} - cassoPi</title>
  </Head>
);

export default Title;
