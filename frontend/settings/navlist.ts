interface INavlist {
  id: number;
  pathname: string;
  name: string;
}

const navlist: INavlist[] = [
  { id: 1, pathname: "/market", name: "Marketplace" },
  { id: 2, pathname: "/create", name: "Create" },
];

export default navlist;
