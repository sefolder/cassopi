import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

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

const NFTCard = ({
  artId,
  uri,
  price,
  width,
}: {
  artId: number;
  uri: string;
  price: number;
  width?: number;
}) => (
  <Link href={`/market/${artId}`} as={`/market/${artId}`}>
    <a>
      <Container>
        <NFTWrapper>
          <CardImage src={uri} alt="artId" layout="fill" objectFit="cover" />
        </NFTWrapper>
        <InfoWrapper>
          <NFTName>NFT제목</NFTName>
          <Creater>심윤보</Creater>
          <Price>{price} KLAY</Price>
        </InfoWrapper>
      </Container>
    </a>
  </Link>
);

export default NFTCard;
