"use client";
import React, { useState } from "react";
import SlideFirst from "./slide_1";
import Start from "./start";
import SlideSecound from "./slide_2";
import SlideThird from "./slide_3";

const PdfCarouselC9L2A4 = () => {
  const [isFirstScreen, setIsFirstScreen] = useState("start");
  return (
    <div >
      {isFirstScreen === "start" && (
        <Start setIsFirstScreen={setIsFirstScreen} />
      )}

      {isFirstScreen === "first" && <SlideFirst setIsFirstScreen={setIsFirstScreen} />}
      {isFirstScreen === "secound" && <SlideSecound setIsFirstScreen={setIsFirstScreen} />}
      {isFirstScreen === "third" && <SlideThird  />}
    </div>
  );
};

export default PdfCarouselC9L2A4;
