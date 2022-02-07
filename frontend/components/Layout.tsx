import React from "react";
import NavBar from "./NavBar";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "../settings/hooks";
import { login } from "../settings/slices/user";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "../settings/store";

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
  return (
    <CookiesProvider>
      <Provider store={store}>
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
      </Provider>
    </CookiesProvider>
  );
}
