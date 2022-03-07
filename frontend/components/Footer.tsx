import styled from "styled-components";
import { footerList } from "../settings/navlists";
import Link from "next/link";

const Container = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${(props) => props.theme.mainColor};
  padding: 35px 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1080px) {
    padding: 30px 50px;
  }
  @media screen and (max-width: 860px) {
    padding: 20px 15px;
    height: 100px;
  }
`;

const Links = styled.ul`
  display: flex;
  gap: 10px;
`;

const LinkLi = styled.li`
  color: white;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.1s ease-in-out;
  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const InfoText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: white;

  strong {
    font-size: 15px;
  }

  @media screen and (max-width: 1080px) {
  }
  @media screen and (max-width: 860px) {
    font-size: 12px;
    line-height: 15px;
    strong {
      font-size: 13px;
    }
  }
`;

const CopyText = styled.span`
  font-size: 13px;
  font-weight: 300;
  color: white;
  @media screen and (max-width: 1080px) {
  }
  @media screen and (max-width: 860px) {
    font-size: 10px;
  }
`;

const Footer = () => (
  <Container>
    {/* <Links>
      {footerList.map(({ id, pathname, name }) => (
        <LinkLi key={id}>
          <Link href={pathname}>
            <a>{name}</a>
          </Link>
        </LinkLi>
      ))}
    </Links> */}
    <InfoText>
      <strong>Team SeFolder</strong> | 문의{" "}
      <a
        href="https://open.kakao.com/o/srxUQhXd"
        target="_blank"
        rel="noreferrer"
      >
        https://open.kakao.com/o/srxUQhXd
      </a>{" "}
      | 경기도 수원시 서부로 2066 성균관대학교 반도체관
    </InfoText>
    <CopyText>&copy; 2022 cassoPi. All Rights Reserved.</CopyText>
  </Container>
);

export default Footer;
