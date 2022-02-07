import React, { useEffect } from "react";
import NavBar from "./NavBar";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { CookiesProvider } from "react-cookie";
import { useRouter } from "next/router";
import { useAppSelector } from "../settings/hooks";
import { userOnlyList } from "../settings/navlists";

const Container = styled.div`
  width: 100%;
  padding-top: ${(props) => props.theme.navBarHeight};
`;

const Content = styled.div`
  width: 100%;
  min-height: 100vh;
  max-height: max-content;
`;

const Center = styled.div`
  width: 1080px;
  height: max-content;
  margin: 0 auto;
  padding: 20px 10px;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLogin = useAppSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (userOnlyList.includes(router.pathname) && !isLogin) {
      router.push("/");
    }
  }, [isLogin]);

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Container>
          <NavBar />
          <Content>
            <Center>{children}</Center>
          </Content>
        </Container>

        <style jsx global>{`
          html,
          body {
            font-family: "Noto Sans KR", sans-serif;
          }
        `}</style>
      </ThemeProvider>
    </CookiesProvider>
  );
}
