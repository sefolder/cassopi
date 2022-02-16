import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const SliderContainer = styled.div`
  width: 300%;
  display: flex;
`;

const NextButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 70px;
  position: absolute;
  right: 5px;
  top: 250px;
`;

const PrevButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 70px;
  position: absolute;
  left: 5px;
  top: 250px;
`;

const BannerSlider = () => {
  const TOTAL_SLIDES = 2; //0 ~ 2
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
      (currentSlide / 3) * 100
    }%)`;
  }, [currentSlide]);

  return (
    <Container>
      <SliderContainer ref={slideRef}>
        <Image
          src="serviceopen_banner_cropped.png"
          alt="home banner 1"
          width={1200}
          height={650}
        />
        <a
          href="https://forms.gle/L5AerRzfDMzDfZfbA"
          target="_blank"
          rel="noreferrer"
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
        >
          <Image
            src="designer_banner_cropped.png"
            alt="home banner 3"
            width={1200}
            height={650}
          />
        </a>
      </SliderContainer>
      <PrevButton onClick={prevSlide}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </PrevButton>
      <NextButton onClick={nextSlide}>
        <FontAwesomeIcon icon={faAngleRight} />
      </NextButton>
    </Container>
  );
};

export default BannerSlider;
