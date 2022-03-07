import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import * as ga from "../lib/gtag";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  @media screen and (max-width: 1080px) {
    margin-bottom: 20px;
  }
  @media screen and (max-width: 860px) {
    margin-bottom: 15px;
  }
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  width: 400%;
  display: flex;
`;

const NextButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 70px;
`;

const PrevButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 70px;
`;

const BannerSlider = () => {
  const freeKlayBannerClick = () => {
    ga.event({
      action: "banner click",
      category: "banner",
      label: "freeklay",
      value: "",
    });
    console.log("free klay banner clicked");
  };
  const homeBannerClick = () => {
    ga.event({
      action: "banner click",
      category: "banner",
      label: "home",
      value: "",
    });
  };
  const designerBannerClick = () => {
    ga.event({
      action: "banner click",
      category: "banner",
      label: "designer",
      value: "",
    });
  };

  const TOTAL_SLIDES = 3; //0 ~ 2
  const [currentSlide, setCurrentSlide] = useState(0);
  let slideRef = useRef<any>();

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) setCurrentSlide(0);
    else setCurrentSlide((current) => current + 1);
  };

  const prevSlide = () => {
    if (currentSlide === 0) setCurrentSlide(TOTAL_SLIDES);
    else setCurrentSlide((current) => current - 1);
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${
      (currentSlide / 4) * 100
    }%)`;
  }, [currentSlide]);

  return (
    <Wrapper>
      <PrevButton onClick={prevSlide}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </PrevButton>
      <Container>
        <SliderContainer ref={slideRef}>
          <Image
            src="serviceopen_banner_cropped.png"
            alt="home banner 1"
            width={1200}
            height={650}
          />
          <a
            id="serviceopen_banner"
            href="https://forms.gle/wrKpeSLqEtb6txRv7"
            target="_blank"
            rel="noreferrer"
            onClick={() => freeKlayBannerClick()}
          >
            <Image
              src="surveyandfreeklay_banner.png"
              alt="home banner 3"
              width={1200}
              height={650}
            />
          </a>
          <a
            href="https://forms.gle/L5AerRzfDMzDfZfbA"
            target="_blank"
            rel="noreferrer"
            onClick={() => homeBannerClick()}
          >
            <Image
              src="home_banner_cropped.png"
              alt="home banner 2"
              width={1200}
              height={650}
            />
          </a>
          <a
            href="https://forms.gle/hSvDZk2jmDKWRQ5V9"
            target="_blank"
            rel="noreferrer"
            onClick={() => designerBannerClick()}
          >
            <Image
              src="designer_banner_cropped.png"
              alt="home banner 3"
              width={1200}
              height={650}
            />
          </a>
        </SliderContainer>
      </Container>
      <NextButton onClick={nextSlide}>
        <FontAwesomeIcon icon={faAngleRight} />
      </NextButton>
    </Wrapper>
  );
};

export default BannerSlider;
