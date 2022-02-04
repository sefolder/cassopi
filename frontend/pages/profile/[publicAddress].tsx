import type { NextPage } from "next";
import { useRouter } from "next/router";
import Title from "../../components/Title";

// 다른 유저의 콜렉션 (Public Address 이용)
const Collection: NextPage = () => {
  const {
    query: { publicAddress },
  } = useRouter();
  return (
    <>
      <Title>{publicAddress}</Title>
      <h1>Collection {publicAddress}</h1>
    </>
  );
};

export default Collection;
