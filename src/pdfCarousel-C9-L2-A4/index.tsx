"use client";
import React, { useState } from "react";
import SlideFirst from "./slide_1";
import Start from "./start";
import SlideSecound from "./slide_2";
import SlideThird from "./slide_3";
import Table from "./table";

export type FormValues = {
  first?: string;
  secound?: string;
};

const PdfCarouselC9L2A4 = () => {
  const [isFirstScreen, setIsFirstScreen] = useState("start");
  const [formData, setFormData] = useState<FormValues[]>([]);

  return (
    <div>
      {isFirstScreen === "start" && (
        <Start setIsFirstScreen={setIsFirstScreen} />
      )}

      {isFirstScreen === "first" && (
        <SlideFirst setIsFirstScreen={setIsFirstScreen} setFormData={setFormData} />
      )}
      {isFirstScreen === "secound" && (
        <SlideSecound setIsFirstScreen={setIsFirstScreen} setFormData={setFormData} />
      )}
     {isFirstScreen === "third" && (
  <SlideThird formData={formData}  setIsFirstScreen={setIsFirstScreen}  setFormData={setFormData} />
)}
       {isFirstScreen === "table" && <Table   />}
    </div>
  );
};

export default PdfCarouselC9L2A4;