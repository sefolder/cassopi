import type { NextPage } from "next";
import { useRouter } from "next/router";
import Title from "../../components/Title";

const Art: NextPage = () => {
  const {
    query: { artId },
  } = useRouter();
  return (
    <>
      <Title>{artId}</Title>
      <h1>Art {artId}</h1>
    </>
  );
};

export default Art;
