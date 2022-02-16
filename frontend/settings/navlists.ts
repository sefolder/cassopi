interface INavlist {
  id: number;
  pathname: string;
  name: string;
}

export const navList: INavlist[] = [
  { id: 1, pathname: "/market", name: "Marketplace" },
  { id: 2, pathname: "/create", name: "Create" },
];

export const userNavList: INavlist[] = [
  { id: 1, pathname: "/profile", name: "내 프로필" },
  // { id: 1, pathname: "/profile", name: "내 콜렉션" },
  // { id: 2, pathname: "/profile/info", name: "회원정보" },
  // { id: 3, pathname: "/profile/edit", name: "회원정보수정" },
];

export const userOnlyList: string[] = [
  "/profile",
  "/profile/info",
  "/profile/edit",
];

export const footerList: INavlist[] = [
  { id: 1, pathname: "/policy", name: "이용약관" },
  { id: 2, pathname: "/privacy", name: "개인정보처리방침" },
  { id: 3, pathname: "/sitemap", name: "사이트맵" },
];
