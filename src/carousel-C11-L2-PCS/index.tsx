"use client"
import React, { useState } from "react";
import FirstPage from "./firstPage";
import QustionPage from "./qustionPage";

const CarouselC11L2PCS = () => {
  const [isFirstScreen ,setIsFirstScreen]= useState("firstPage")
  return (
  <div>
{isFirstScreen == "firstPage" && <FirstPage setIsFirstScreen={setIsFirstScreen}/>}
{isFirstScreen == "QustionPgae" &&  <QustionPage />}
  </div>
  );
};

export default CarouselC11L2PCS;
