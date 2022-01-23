import React from "react";
import NavBar from "./NavBar";
import { Provider } from "react-redux";
import { store } from "../settings/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NavBar />
      {children}
    </Provider>
  );
}
