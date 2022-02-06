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
  { id: 1, pathname: "/profile", name: "내 콜렉션" },
  { id: 2, pathname: "/profile/info", name: "회원정보" },
  { id: 3, pathname: "/profile/edit", name: "회원정보수정" },
];
