import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import Link from "next/link";
import styled from "styled-components";
import { fetchCardsOf } from "../api/useCaver";
import CollectionCard from "../components/CollectionCard";
import NFTCard from "../components/NFTCard";

const BannerContainer = styled.div`
  //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  align-items: center;
`;

const Banner = styled.img`
  transition: 0.3s;
  width: 100%;
  align-items: center;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Bigtxt = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const Square = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 10%;
  background-color: lightgrey;
  cursor: pointer;
`;

const NFT1Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr;
  /* grid-column: 1 / 3;
  grid-row: 1 / 3; */
  grid-gap: 20px;
  //background-color: #8592929e;
`;

const NFT2Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(250px, auto);
  //background-color: #8592929e;
`;

const CardImage = styled(Image)`
  border-radius: 10px;
`;


const Home: NextPage = () => {
  const BannerURL =
    //"https://image.freepik.com/free-vector/abstract-dotted-banner-background_1035-18160.jpg"; //temporary
    "/home_banner_cropped.png";
  const eventURL = "https://forms.gle/L5AerRzfDMzDfZfbA";

  //인기 NFT
  const [nfts1, setNfts1] = useState([
    {
      //인기 NFT 직접 넣기
      id: 0,
      uri: "https://cassopi-tempbucket.s3.ap-northeast-2.amazonaws.com/hrw1.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAL0qLC0dabuuJXEcnzAbJNPnofFNW%2BIGNkMi1hZXQENIAiAjkXxzjxsUHf5o564BjnR6qnvcATDAcrNT4QlyKRsTpCrkAghEEAAaDDI2Mzk0NzIwNDY4OSIMQ6JV4dp5KlIlvKPfKsEC%2FZGslZ3Hy3xfVZtXf3nLsslsREWlq10wMnO8%2Fl%2BW1Jsqd%2FiV1tezlNqK%2BnxosI1ssXJrx7E78tMOqbZ3AJzJTdTKtW2KAF7iE2yJhTuHO5pYeUFqn6Awj3vRPy3WrS8Q7U5ueMshiTo2WYliI4L3zfaEeXfQadCS5FVIL1oO8jOEVnt%2FIi8zWJ7S9%2F02wV0IQ83cFeERXVnin2EB7vCZbI2hBIvBWLHnJpWGAEPNSt%2FQpg3vlegZHRgnMNorY%2FJC7ZOUGIj2o2H39FDtWmbBnICqXn4sgX7zTSfeNwWDvUgMiMkU1ZLXb7gV5gN51TEC36Vt83j9Cx9N4JSUzy3l1eglsbMSQ6B11VUQZJxiYO88alo6hnRx9F2fcBL9RUB%2By6RQWgiYJzfeGk7wjX5YjbJTAZS7H3NYiGaumQwg8cwJMIv9mJAGOrMCo60%2BgB10270tz1XpSEH%2FrOyVtjPHuNa9MvXa518vyN24Z0uqYB%2FlnBPLjc5d7Gx4u9IBKc90wuiOtVMTe472rA8NjMD8fLvarSSXRxdKj2ut%2Fre4cDR79DXRcrAs6TTjkDQCBM1NAjktwU8CtBBzu3QiB6PMpp3drswviVQVGKWhWbal82ZIG5JMglO2OZb%2FYAFO0pkzD5mKRkjOksZ1nXlT0WDQ2yCwzPw8wOKSNNw3MruTOcRZtaeuU05RUbnExN5xc1bcKvwrOUOyBdQkjNcC20j4rTT0hTIzh3M4X1ZYr6IGBHtMJm19CGAjbmoX0wrr0em1H91rb9y6j7NstK7m1VGjJxOq0m4EtGU%2BkJvrPNM0%2BZoMKEmCfEAR2CGewoUE1%2F8k9uxTQzjiVjq%2Bdd7Ogw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220211T110644Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=ASIAT25D2XBIQOSXQGFK%2F20220211%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=32ca0a5ba8a89d24f79732140e32ae59c702759bb7524265dec4ac2ae7e491f8",
    },
    {
      id: 1,
      uri: "https://cassopi-tempbucket.s3.ap-northeast-2.amazonaws.com/lsh3.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAL0qLC0dabuuJXEcnzAbJNPnofFNW%2BIGNkMi1hZXQENIAiAjkXxzjxsUHf5o564BjnR6qnvcATDAcrNT4QlyKRsTpCrkAghEEAAaDDI2Mzk0NzIwNDY4OSIMQ6JV4dp5KlIlvKPfKsEC%2FZGslZ3Hy3xfVZtXf3nLsslsREWlq10wMnO8%2Fl%2BW1Jsqd%2FiV1tezlNqK%2BnxosI1ssXJrx7E78tMOqbZ3AJzJTdTKtW2KAF7iE2yJhTuHO5pYeUFqn6Awj3vRPy3WrS8Q7U5ueMshiTo2WYliI4L3zfaEeXfQadCS5FVIL1oO8jOEVnt%2FIi8zWJ7S9%2F02wV0IQ83cFeERXVnin2EB7vCZbI2hBIvBWLHnJpWGAEPNSt%2FQpg3vlegZHRgnMNorY%2FJC7ZOUGIj2o2H39FDtWmbBnICqXn4sgX7zTSfeNwWDvUgMiMkU1ZLXb7gV5gN51TEC36Vt83j9Cx9N4JSUzy3l1eglsbMSQ6B11VUQZJxiYO88alo6hnRx9F2fcBL9RUB%2By6RQWgiYJzfeGk7wjX5YjbJTAZS7H3NYiGaumQwg8cwJMIv9mJAGOrMCo60%2BgB10270tz1XpSEH%2FrOyVtjPHuNa9MvXa518vyN24Z0uqYB%2FlnBPLjc5d7Gx4u9IBKc90wuiOtVMTe472rA8NjMD8fLvarSSXRxdKj2ut%2Fre4cDR79DXRcrAs6TTjkDQCBM1NAjktwU8CtBBzu3QiB6PMpp3drswviVQVGKWhWbal82ZIG5JMglO2OZb%2FYAFO0pkzD5mKRkjOksZ1nXlT0WDQ2yCwzPw8wOKSNNw3MruTOcRZtaeuU05RUbnExN5xc1bcKvwrOUOyBdQkjNcC20j4rTT0hTIzh3M4X1ZYr6IGBHtMJm19CGAjbmoX0wrr0em1H91rb9y6j7NstK7m1VGjJxOq0m4EtGU%2BkJvrPNM0%2BZoMKEmCfEAR2CGewoUE1%2F8k9uxTQzjiVjq%2Bdd7Ogw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220211T110631Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=ASIAT25D2XBIQOSXQGFK%2F20220211%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=8917cc1784422697470123729987df171532d3d3bba1c685460bd72df75eb22f",
    },
    {
      id: 2,
      uri: "https://cassopi-tempbucket.s3.ap-northeast-2.amazonaws.com/yjm1.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAL0qLC0dabuuJXEcnzAbJNPnofFNW%2BIGNkMi1hZXQENIAiAjkXxzjxsUHf5o564BjnR6qnvcATDAcrNT4QlyKRsTpCrkAghEEAAaDDI2Mzk0NzIwNDY4OSIMQ6JV4dp5KlIlvKPfKsEC%2FZGslZ3Hy3xfVZtXf3nLsslsREWlq10wMnO8%2Fl%2BW1Jsqd%2FiV1tezlNqK%2BnxosI1ssXJrx7E78tMOqbZ3AJzJTdTKtW2KAF7iE2yJhTuHO5pYeUFqn6Awj3vRPy3WrS8Q7U5ueMshiTo2WYliI4L3zfaEeXfQadCS5FVIL1oO8jOEVnt%2FIi8zWJ7S9%2F02wV0IQ83cFeERXVnin2EB7vCZbI2hBIvBWLHnJpWGAEPNSt%2FQpg3vlegZHRgnMNorY%2FJC7ZOUGIj2o2H39FDtWmbBnICqXn4sgX7zTSfeNwWDvUgMiMkU1ZLXb7gV5gN51TEC36Vt83j9Cx9N4JSUzy3l1eglsbMSQ6B11VUQZJxiYO88alo6hnRx9F2fcBL9RUB%2By6RQWgiYJzfeGk7wjX5YjbJTAZS7H3NYiGaumQwg8cwJMIv9mJAGOrMCo60%2BgB10270tz1XpSEH%2FrOyVtjPHuNa9MvXa518vyN24Z0uqYB%2FlnBPLjc5d7Gx4u9IBKc90wuiOtVMTe472rA8NjMD8fLvarSSXRxdKj2ut%2Fre4cDR79DXRcrAs6TTjkDQCBM1NAjktwU8CtBBzu3QiB6PMpp3drswviVQVGKWhWbal82ZIG5JMglO2OZb%2FYAFO0pkzD5mKRkjOksZ1nXlT0WDQ2yCwzPw8wOKSNNw3MruTOcRZtaeuU05RUbnExN5xc1bcKvwrOUOyBdQkjNcC20j4rTT0hTIzh3M4X1ZYr6IGBHtMJm19CGAjbmoX0wrr0em1H91rb9y6j7NstK7m1VGjJxOq0m4EtGU%2BkJvrPNM0%2BZoMKEmCfEAR2CGewoUE1%2F8k9uxTQzjiVjq%2Bdd7Ogw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220211T110231Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=ASIAT25D2XBIQOSXQGFK%2F20220211%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=71b2f1fcb3c8086a850d7fc1a8782b8fadbd7fdd44b832aa90457a112b3df99a",
    },
    {
      id: 3,
      uri: "https://cassopi-tempbucket.s3.ap-northeast-2.amazonaws.com/syb2.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAL0qLC0dabuuJXEcnzAbJNPnofFNW%2BIGNkMi1hZXQENIAiAjkXxzjxsUHf5o564BjnR6qnvcATDAcrNT4QlyKRsTpCrkAghEEAAaDDI2Mzk0NzIwNDY4OSIMQ6JV4dp5KlIlvKPfKsEC%2FZGslZ3Hy3xfVZtXf3nLsslsREWlq10wMnO8%2Fl%2BW1Jsqd%2FiV1tezlNqK%2BnxosI1ssXJrx7E78tMOqbZ3AJzJTdTKtW2KAF7iE2yJhTuHO5pYeUFqn6Awj3vRPy3WrS8Q7U5ueMshiTo2WYliI4L3zfaEeXfQadCS5FVIL1oO8jOEVnt%2FIi8zWJ7S9%2F02wV0IQ83cFeERXVnin2EB7vCZbI2hBIvBWLHnJpWGAEPNSt%2FQpg3vlegZHRgnMNorY%2FJC7ZOUGIj2o2H39FDtWmbBnICqXn4sgX7zTSfeNwWDvUgMiMkU1ZLXb7gV5gN51TEC36Vt83j9Cx9N4JSUzy3l1eglsbMSQ6B11VUQZJxiYO88alo6hnRx9F2fcBL9RUB%2By6RQWgiYJzfeGk7wjX5YjbJTAZS7H3NYiGaumQwg8cwJMIv9mJAGOrMCo60%2BgB10270tz1XpSEH%2FrOyVtjPHuNa9MvXa518vyN24Z0uqYB%2FlnBPLjc5d7Gx4u9IBKc90wuiOtVMTe472rA8NjMD8fLvarSSXRxdKj2ut%2Fre4cDR79DXRcrAs6TTjkDQCBM1NAjktwU8CtBBzu3QiB6PMpp3drswviVQVGKWhWbal82ZIG5JMglO2OZb%2FYAFO0pkzD5mKRkjOksZ1nXlT0WDQ2yCwzPw8wOKSNNw3MruTOcRZtaeuU05RUbnExN5xc1bcKvwrOUOyBdQkjNcC20j4rTT0hTIzh3M4X1ZYr6IGBHtMJm19CGAjbmoX0wrr0em1H91rb9y6j7NstK7m1VGjJxOq0m4EtGU%2BkJvrPNM0%2BZoMKEmCfEAR2CGewoUE1%2F8k9uxTQzjiVjq%2Bdd7Ogw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220211T110417Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=ASIAT25D2XBIQOSXQGFK%2F20220211%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=8a9b87e161e823c1757a10395c58e9b35ae03c228c9ef6ec6e3a815400efac27",
    },
    {
      id: 4,
      uri: "https://cassopi-tempbucket.s3.ap-northeast-2.amazonaws.com/rnj9.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAL0qLC0dabuuJXEcnzAbJNPnofFNW%2BIGNkMi1hZXQENIAiAjkXxzjxsUHf5o564BjnR6qnvcATDAcrNT4QlyKRsTpCrkAghEEAAaDDI2Mzk0NzIwNDY4OSIMQ6JV4dp5KlIlvKPfKsEC%2FZGslZ3Hy3xfVZtXf3nLsslsREWlq10wMnO8%2Fl%2BW1Jsqd%2FiV1tezlNqK%2BnxosI1ssXJrx7E78tMOqbZ3AJzJTdTKtW2KAF7iE2yJhTuHO5pYeUFqn6Awj3vRPy3WrS8Q7U5ueMshiTo2WYliI4L3zfaEeXfQadCS5FVIL1oO8jOEVnt%2FIi8zWJ7S9%2F02wV0IQ83cFeERXVnin2EB7vCZbI2hBIvBWLHnJpWGAEPNSt%2FQpg3vlegZHRgnMNorY%2FJC7ZOUGIj2o2H39FDtWmbBnICqXn4sgX7zTSfeNwWDvUgMiMkU1ZLXb7gV5gN51TEC36Vt83j9Cx9N4JSUzy3l1eglsbMSQ6B11VUQZJxiYO88alo6hnRx9F2fcBL9RUB%2By6RQWgiYJzfeGk7wjX5YjbJTAZS7H3NYiGaumQwg8cwJMIv9mJAGOrMCo60%2BgB10270tz1XpSEH%2FrOyVtjPHuNa9MvXa518vyN24Z0uqYB%2FlnBPLjc5d7Gx4u9IBKc90wuiOtVMTe472rA8NjMD8fLvarSSXRxdKj2ut%2Fre4cDR79DXRcrAs6TTjkDQCBM1NAjktwU8CtBBzu3QiB6PMpp3drswviVQVGKWhWbal82ZIG5JMglO2OZb%2FYAFO0pkzD5mKRkjOksZ1nXlT0WDQ2yCwzPw8wOKSNNw3MruTOcRZtaeuU05RUbnExN5xc1bcKvwrOUOyBdQkjNcC20j4rTT0hTIzh3M4X1ZYr6IGBHtMJm19CGAjbmoX0wrr0em1H91rb9y6j7NstK7m1VGjJxOq0m4EtGU%2BkJvrPNM0%2BZoMKEmCfEAR2CGewoUE1%2F8k9uxTQzjiVjq%2Bdd7Ogw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220211T110440Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=ASIAT25D2XBIQOSXQGFK%2F20220211%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=20a35fcffdca6446c90f93a2a8d6d75e4bd0a4c45688b4486827e2edd8209f50",
    },
    {
      id: 5,
      uri: "https://cassopi-tempbucket.s3.ap-northeast-2.amazonaws.com/rnj7.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAL0qLC0dabuuJXEcnzAbJNPnofFNW%2BIGNkMi1hZXQENIAiAjkXxzjxsUHf5o564BjnR6qnvcATDAcrNT4QlyKRsTpCrkAghEEAAaDDI2Mzk0NzIwNDY4OSIMQ6JV4dp5KlIlvKPfKsEC%2FZGslZ3Hy3xfVZtXf3nLsslsREWlq10wMnO8%2Fl%2BW1Jsqd%2FiV1tezlNqK%2BnxosI1ssXJrx7E78tMOqbZ3AJzJTdTKtW2KAF7iE2yJhTuHO5pYeUFqn6Awj3vRPy3WrS8Q7U5ueMshiTo2WYliI4L3zfaEeXfQadCS5FVIL1oO8jOEVnt%2FIi8zWJ7S9%2F02wV0IQ83cFeERXVnin2EB7vCZbI2hBIvBWLHnJpWGAEPNSt%2FQpg3vlegZHRgnMNorY%2FJC7ZOUGIj2o2H39FDtWmbBnICqXn4sgX7zTSfeNwWDvUgMiMkU1ZLXb7gV5gN51TEC36Vt83j9Cx9N4JSUzy3l1eglsbMSQ6B11VUQZJxiYO88alo6hnRx9F2fcBL9RUB%2By6RQWgiYJzfeGk7wjX5YjbJTAZS7H3NYiGaumQwg8cwJMIv9mJAGOrMCo60%2BgB10270tz1XpSEH%2FrOyVtjPHuNa9MvXa518vyN24Z0uqYB%2FlnBPLjc5d7Gx4u9IBKc90wuiOtVMTe472rA8NjMD8fLvarSSXRxdKj2ut%2Fre4cDR79DXRcrAs6TTjkDQCBM1NAjktwU8CtBBzu3QiB6PMpp3drswviVQVGKWhWbal82ZIG5JMglO2OZb%2FYAFO0pkzD5mKRkjOksZ1nXlT0WDQ2yCwzPw8wOKSNNw3MruTOcRZtaeuU05RUbnExN5xc1bcKvwrOUOyBdQkjNcC20j4rTT0hTIzh3M4X1ZYr6IGBHtMJm19CGAjbmoX0wrr0em1H91rb9y6j7NstK7m1VGjJxOq0m4EtGU%2BkJvrPNM0%2BZoMKEmCfEAR2CGewoUE1%2F8k9uxTQzjiVjq%2Bdd7Ogw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220211T110508Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=ASIAT25D2XBIQOSXQGFK%2F20220211%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=7c54a48c4fff601ac888bd2146ec00da26597cac5f42ba656cf24661632cd714",
    },
    {
      id: 6,
      uri: "https://cassopi-tempbucket.s3.ap-northeast-2.amazonaws.com/rnj6.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAL0qLC0dabuuJXEcnzAbJNPnofFNW%2BIGNkMi1hZXQENIAiAjkXxzjxsUHf5o564BjnR6qnvcATDAcrNT4QlyKRsTpCrkAghEEAAaDDI2Mzk0NzIwNDY4OSIMQ6JV4dp5KlIlvKPfKsEC%2FZGslZ3Hy3xfVZtXf3nLsslsREWlq10wMnO8%2Fl%2BW1Jsqd%2FiV1tezlNqK%2BnxosI1ssXJrx7E78tMOqbZ3AJzJTdTKtW2KAF7iE2yJhTuHO5pYeUFqn6Awj3vRPy3WrS8Q7U5ueMshiTo2WYliI4L3zfaEeXfQadCS5FVIL1oO8jOEVnt%2FIi8zWJ7S9%2F02wV0IQ83cFeERXVnin2EB7vCZbI2hBIvBWLHnJpWGAEPNSt%2FQpg3vlegZHRgnMNorY%2FJC7ZOUGIj2o2H39FDtWmbBnICqXn4sgX7zTSfeNwWDvUgMiMkU1ZLXb7gV5gN51TEC36Vt83j9Cx9N4JSUzy3l1eglsbMSQ6B11VUQZJxiYO88alo6hnRx9F2fcBL9RUB%2By6RQWgiYJzfeGk7wjX5YjbJTAZS7H3NYiGaumQwg8cwJMIv9mJAGOrMCo60%2BgB10270tz1XpSEH%2FrOyVtjPHuNa9MvXa518vyN24Z0uqYB%2FlnBPLjc5d7Gx4u9IBKc90wuiOtVMTe472rA8NjMD8fLvarSSXRxdKj2ut%2Fre4cDR79DXRcrAs6TTjkDQCBM1NAjktwU8CtBBzu3QiB6PMpp3drswviVQVGKWhWbal82ZIG5JMglO2OZb%2FYAFO0pkzD5mKRkjOksZ1nXlT0WDQ2yCwzPw8wOKSNNw3MruTOcRZtaeuU05RUbnExN5xc1bcKvwrOUOyBdQkjNcC20j4rTT0hTIzh3M4X1ZYr6IGBHtMJm19CGAjbmoX0wrr0em1H91rb9y6j7NstK7m1VGjJxOq0m4EtGU%2BkJvrPNM0%2BZoMKEmCfEAR2CGewoUE1%2F8k9uxTQzjiVjq%2Bdd7Ogw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220211T110529Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=ASIAT25D2XBIQOSXQGFK%2F20220211%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=3e87f9aba6f19f1ae508d204a3c14562450609769eb08808803942aedfdc615b",
    },
    {
      id: 7,
      uri: "https://cassopi-tempbucket.s3.ap-northeast-2.amazonaws.com/lsh5.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAL0qLC0dabuuJXEcnzAbJNPnofFNW%2BIGNkMi1hZXQENIAiAjkXxzjxsUHf5o564BjnR6qnvcATDAcrNT4QlyKRsTpCrkAghEEAAaDDI2Mzk0NzIwNDY4OSIMQ6JV4dp5KlIlvKPfKsEC%2FZGslZ3Hy3xfVZtXf3nLsslsREWlq10wMnO8%2Fl%2BW1Jsqd%2FiV1tezlNqK%2BnxosI1ssXJrx7E78tMOqbZ3AJzJTdTKtW2KAF7iE2yJhTuHO5pYeUFqn6Awj3vRPy3WrS8Q7U5ueMshiTo2WYliI4L3zfaEeXfQadCS5FVIL1oO8jOEVnt%2FIi8zWJ7S9%2F02wV0IQ83cFeERXVnin2EB7vCZbI2hBIvBWLHnJpWGAEPNSt%2FQpg3vlegZHRgnMNorY%2FJC7ZOUGIj2o2H39FDtWmbBnICqXn4sgX7zTSfeNwWDvUgMiMkU1ZLXb7gV5gN51TEC36Vt83j9Cx9N4JSUzy3l1eglsbMSQ6B11VUQZJxiYO88alo6hnRx9F2fcBL9RUB%2By6RQWgiYJzfeGk7wjX5YjbJTAZS7H3NYiGaumQwg8cwJMIv9mJAGOrMCo60%2BgB10270tz1XpSEH%2FrOyVtjPHuNa9MvXa518vyN24Z0uqYB%2FlnBPLjc5d7Gx4u9IBKc90wuiOtVMTe472rA8NjMD8fLvarSSXRxdKj2ut%2Fre4cDR79DXRcrAs6TTjkDQCBM1NAjktwU8CtBBzu3QiB6PMpp3drswviVQVGKWhWbal82ZIG5JMglO2OZb%2FYAFO0pkzD5mKRkjOksZ1nXlT0WDQ2yCwzPw8wOKSNNw3MruTOcRZtaeuU05RUbnExN5xc1bcKvwrOUOyBdQkjNcC20j4rTT0hTIzh3M4X1ZYr6IGBHtMJm19CGAjbmoX0wrr0em1H91rb9y6j7NstK7m1VGjJxOq0m4EtGU%2BkJvrPNM0%2BZoMKEmCfEAR2CGewoUE1%2F8k9uxTQzjiVjq%2Bdd7Ogw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220211T110600Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=ASIAT25D2XBIQOSXQGFK%2F20220211%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=cb7f904c6bae76fe911b91139ef03844ba418bfe440fde6d6a57e25ac3a68fcd",
    },
    {
      id: 8,
      uri: "https://cassopi-tempbucket.s3.ap-northeast-2.amazonaws.com/lsh4.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAL0qLC0dabuuJXEcnzAbJNPnofFNW%2BIGNkMi1hZXQENIAiAjkXxzjxsUHf5o564BjnR6qnvcATDAcrNT4QlyKRsTpCrkAghEEAAaDDI2Mzk0NzIwNDY4OSIMQ6JV4dp5KlIlvKPfKsEC%2FZGslZ3Hy3xfVZtXf3nLsslsREWlq10wMnO8%2Fl%2BW1Jsqd%2FiV1tezlNqK%2BnxosI1ssXJrx7E78tMOqbZ3AJzJTdTKtW2KAF7iE2yJhTuHO5pYeUFqn6Awj3vRPy3WrS8Q7U5ueMshiTo2WYliI4L3zfaEeXfQadCS5FVIL1oO8jOEVnt%2FIi8zWJ7S9%2F02wV0IQ83cFeERXVnin2EB7vCZbI2hBIvBWLHnJpWGAEPNSt%2FQpg3vlegZHRgnMNorY%2FJC7ZOUGIj2o2H39FDtWmbBnICqXn4sgX7zTSfeNwWDvUgMiMkU1ZLXb7gV5gN51TEC36Vt83j9Cx9N4JSUzy3l1eglsbMSQ6B11VUQZJxiYO88alo6hnRx9F2fcBL9RUB%2By6RQWgiYJzfeGk7wjX5YjbJTAZS7H3NYiGaumQwg8cwJMIv9mJAGOrMCo60%2BgB10270tz1XpSEH%2FrOyVtjPHuNa9MvXa518vyN24Z0uqYB%2FlnBPLjc5d7Gx4u9IBKc90wuiOtVMTe472rA8NjMD8fLvarSSXRxdKj2ut%2Fre4cDR79DXRcrAs6TTjkDQCBM1NAjktwU8CtBBzu3QiB6PMpp3drswviVQVGKWhWbal82ZIG5JMglO2OZb%2FYAFO0pkzD5mKRkjOksZ1nXlT0WDQ2yCwzPw8wOKSNNw3MruTOcRZtaeuU05RUbnExN5xc1bcKvwrOUOyBdQkjNcC20j4rTT0hTIzh3M4X1ZYr6IGBHtMJm19CGAjbmoX0wrr0em1H91rb9y6j7NstK7m1VGjJxOq0m4EtGU%2BkJvrPNM0%2BZoMKEmCfEAR2CGewoUE1%2F8k9uxTQzjiVjq%2Bdd7Ogw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220211T110613Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=ASIAT25D2XBIQOSXQGFK%2F20220211%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=f391b986e15ffe68dc2e3501cd7e51c35b8279956dfa480b4e57a986b9d449d0",
    },
  ]);

  //최근 올라온 NFT 리스트
  const [nfts2, setNfts2] = useState([
    {
      id: 0,
      uri: "",
    },
  ]);

  const fetchMarketNFTs = async () => {
    const _nfts = await fetchCardsOf(process.env.NEXT_PUBLIC_MARKET_CONTRACT);
    setNfts2(_nfts);
  };

  useEffect(() => {
    fetchMarketNFTs();
  }, []);

  return (
    <>
      <Title>홈</Title>
      <BannerContainer>
        <a href={eventURL} target="_blank" rel="noreferrer">
          <Banner src={BannerURL} />
        </a>
      </BannerContainer>
      <br />
      <br />
      <Bigtxt>이번주 NFT 판매 순위</Bigtxt> <br />
      <NFT1Container>
        <Square style={{ width: "340px", height: "340px", overflow:'hidden', gridColumn: "1 / 3", gridRow: "1 / 3" }}>
          <CardImage
            src="rnj9.jpg"
            alt="artId"
            width={340}
            height={340}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow:'hidden'}}>
          <CardImage
            src="lsh3.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow:'hidden'}}>
          <CardImage
            src="lsh5.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow:'hidden'}}>
          <CardImage
            src="lsh4.jpeg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow:'hidden'}}>
          <CardImage
            src="rnj6.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow:'hidden'}}>
          <CardImage
            src="rnj7.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow:'hidden'}}>
          <CardImage
            src="yjm1.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow:'hidden'}}>
          <CardImage
            src="hrw1.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
        <Square style={{ overflow:'hidden'}}>
          <CardImage
            src="syb2.jpg"
            alt="artId"
            width={160}
            height={160}
            objectFit="cover"
          />
        </Square>
      </NFT1Container>
      <br />
      <br />
      <br />
      <Bigtxt>최근 올라온 NFT</Bigtxt> <br />
      <NFT2Container>
        {nfts2
          .slice(0)
          .reverse()
          .map(
            (nft, index) =>
              nft.uri.length > 0 && (
                <NFTCard
                  key={`NFT${nft.id}`}
                  artId={nft.id}
                  uri={nft.uri}
                  price={0.01}
                  width={75}
                ></NFTCard>
              )
          )}
      </NFT2Container>
    </>
  );
};

export default Home;
