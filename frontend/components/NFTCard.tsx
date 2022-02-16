import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSeller } from "../api/useCaver";

const Container = styled.div`
  border-radius: 5px;
  margin: 2vw;
  margin-left: 0;
  border-radius: 10px;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.3);
`;

const NFTWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`;

const InfoWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const CardImage = styled(Image)`
  border-radius: 10px 10px 0 0;
`;

const NFTName = styled.span`
  font-weight: bold;
  font-size: 1.3rem;
`;

const Price = styled.span`
  color: ${(props) => props.theme.mainColor};
  font-weight: bold;
  font-size: 1.5rem;
`;

const Creater = styled.span`
  color: gray;
  font-size: small;
  margin: 5px 0px;
`;

interface Imetadata {
  name: string;
  description: string;
  attributes: any;
}
interface Infts {
  id: number;
  image: string;
  metadata: Imetadata;
}

const NFTCard = ({ price, nftInfo }: { price: number; nftInfo: Infts }) => {
  const [seller, setSeller] = useState("");

  useEffect(() => {
    (async () => {
      const _seller = await getSeller(nftInfo.id);
      if (_seller === "0x2bc2C46165b64A3AF6A257B9fF882A1f7BeBc327")
        setSeller("Hong");
      else if (_seller === "0x04eDD3CFE636cd7721c5C269C526f48E6c037A17")
        setSeller("sunny");
      else if (_seller === "0x71b515c2aed4B59ccf93be7C1393C51228f0d89C")
        setSeller("summer");
      else if (_seller === "0x746320b345a70969838279E2609b3F876d6a8898")
        setSeller("whybe");
      else {
        setSeller("user");
      }
    })();
  }, []);

  return (
    <Link href={"/market/[artId]"} as={`/market/${nftInfo.id}`}>
      <a>
        <Container>
          <NFTWrapper>
            <CardImage
              src={nftInfo.image}
              alt="artId"
              layout="fill"
              objectFit="cover"
            />
          </NFTWrapper>
          <InfoWrapper>
            <NFTName>{nftInfo.metadata.name}</NFTName>
            <Creater>{seller}</Creater>
            <Price>{price} KLAY</Price>
          </InfoWrapper>
        </Container>
      </a>
    </Link>
  );
};

export default NFTCard;
