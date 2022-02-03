import Head from "next/head";

const Title = ({ children }: { children: string | string[] | undefined }) => (
  <Head>
    <title>{children} - cassoPi</title>
  </Head>
);

export default Title;
