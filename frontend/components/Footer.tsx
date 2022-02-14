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

const CopyText = styled.span`
  font-size: 13px;
  font-weight: 300;
  color: white;
`;

const Footer = () => (
  <Container>
    <Links>
      {footerList.map(({ id, pathname, name }) => (
        <LinkLi key={id}>
          <Link href={pathname}>
            <a>{name}</a>
          </Link>
        </LinkLi>
      ))}
    </Links>
    <CopyText>&copy; 2022 cassoPi. All Rights Reserved.</CopyText>
  </Container>
);

export default Footer;
