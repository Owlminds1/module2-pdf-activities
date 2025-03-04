"use client";
import jsPDF from "jspdf";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type formData = {
  first: string;
  secound: string;
  third: string;
  four: string;
  five:string
};


const Page = () => {
  const [isFirstScreen, setIsFirstScreen] = useState("start");
  const { control, handleSubmit } =useForm<formData>();

  const onSubmit = (data: formData) => {
    const doc = new jsPDF();
    const title = "Soda Shaker";
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = doc.getTextWidth(title);
    const center = (pageWidth - textWidth) / 2;
    doc.text(title, center, 20); // Title Center mein
  
    // Image Add (Center mein)
    const imgData = "/images/school_image.jpg"; // Image Path
    const imgWidth = 40; // Image Width
    const imgHeight = 50; // Image Height
    const imgX = (pageWidth - imgWidth) / 2; // Image Center X Axis
    const imgY = 30; // Image Y Axis (Title ke niche)
  
    doc.addImage(imgData, "JPEG", imgX, imgY, imgWidth, imgHeight);
  
    let y = imgY + imgHeight + 20; // Image ke niche se text start hoga
  
    const addTextWithPageBreak = (label: string, content: string) => {
      doc.text(label, 10, y);
      y += 10;
      const contentText = doc.splitTextToSize(content, pageWidth - 20);
  
      contentText.forEach((line:string) => {
        if (y + 10 > pageHeight - 20) {
          doc.addPage(); // Page Break
          y = 20; // Reset Y Position
     
        }
        doc.text(line, 10, y);
        y += 10;
      });
  
      y += 10; // Extra Gap
    };
    doc.setFontSize(12);
    // Sab Fields ko Dynamically Add karna
    addTextWithPageBreak("Situation - Understand the situation and describe the problem.", data.first);
    addTextWithPageBreak("Options - Name 3 ways you could solve the problem.", data.secound);
    addTextWithPageBreak("Disadvantages - What negative things could happen?:", data.third);
    addTextWithPageBreak("Advantages - What positive things can happen?:", data.four);
    addTextWithPageBreak("Shake on it and attempt a solution - Mix multiple options to arrive at the final solution.:", data.five);
  
    // Page Numbers Add karna

    
  
    doc.save("soda_shaker.pdf");
  };
  
  
  

  return (
    <div className="min-h-screen p-5 bg-[#F8FAFC] flex flex-col gap-6 justify-start items-center">
      {isFirstScreen === "start" && (
        <>
          <h3 className="text-4xl text-black ">Soda shakers</h3>
          <div className=" grid grid-cols-12 p-2 w-full place-items-center shadow-black   rounded-lg ">
            <div className="col-span-6">
              <Image
                src="/images/soda_shaker.jpg"
                width={200}
                height={100}
                alt="soda shaker"
              />
            </div>
            <div className="col-span-6 w-full p-3 text-black">
              <ul className="list-disc space-y-3 text-2xl text-black">
                <li>
                  <strong>Situation -</strong> Understand the situation and
                  describe the problem.
                </li>
                <li>
                  <strong>Options -</strong> Name 3 ways you could solve the
                  problem.
                </li>
                <li>
                  <strong>Disadvantages -</strong> What negative things could
                  happen?
                </li>
                <li>
                  <strong>Advantages -</strong> What positive things can happen?
                </li>
              </ul>
              <p className="text-2xl py-3">
                <strong>Shake</strong> on it and attempt a solution - Mix
                multiple options to arrive at the final solution
              </p>
            </div>
          </div>
          <div className="border border-black rounded-lg px-8 py-1 shadow-inner shadow-[#000000b9] bg-yellow-400 hover:scale-90">
            <h3
              className="text-[30px]  cursor-pointer text-black"
              onClick={() => setIsFirstScreen("soda_shaker")}
            >
              Start
            </h3>
          </div>
        </>
      )}

      {isFirstScreen === "soda_shaker" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[700px] border  p-3 rounded-lg text-black flex flex-col gap-3  justify-center items-center"
        >
          <h3 className="text-2xl text-black text-center ">
            Your family can’t decide what to do for a weekend activity, and
            everyone wants something different. Mom wants to read, while dad
            wants to watch a movie. Grandmas want to have a barbecue, but
            Grandpas want to go fishing. The sister wants to play board games,
            while brothers want to have a game of soccer.
          </h3>
          <div className=" relative h-[400px] shadow-md w-full flex justify-center items-center ">
            <Image
              src="/images/school_image.jpg"
            fill
              alt="soda shaker"
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col w-full min-h-[150px] p-3 bg-blue-300 rounded-lg ">
            <label htmlFor="first" className="text-2xl text-black py-2">
            Situation - Understand the situation and describe the problem.
            </label>
            <Controller
              control={control}
              name="first"
              render={({ field }) => (
                <textarea
                  id="first"
                  className="border border-black  rounded-lg p-2"
                  placeholder="Enter your thought"
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex flex-col w-full min-h-[150px] p-3 bg-yellow-300 rounded-lg">
            <label htmlFor="secound" className="text-2xl text-black py-2">
            Options - Name 3 ways you could solve the problem.
            </label>
            <Controller
              control={control}
              name="secound"
              render={({ field }) => (
                <textarea
                  id="secound"
                  className="border border-black  rounded-lg p-2"
                  placeholder="Enter your thought"
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex flex-col w-full min-h-[150px] p-3 bg-blue-300 rounded-lg">
            <label htmlFor="third" className="text-2xl text-black py-2">
            Disadvantages - What negative things could happen?
            </label>
            <Controller
              control={control}
              name="third"
              render={({ field }) => (
                <textarea
                  id="third"
                  className="border border-black  rounded-lg p-2"
                  placeholder="Enter your thought"
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full min-h-[150px] p-3 bg-yellow-300 rounded-lg">
            <label htmlFor="four" className="text-2xl text-black py-2">
            Advantages - What positive things can happen?
            </label>
            <Controller
              control={control}
              name="four"
              render={({ field }) => (
                <textarea
                  id="four"
                  className="border border-black  rounded-lg p-2"
                  placeholder="Enter your thought"
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex flex-col w-full min-h-[150px] p-3 bg-blue-300 rounded-lg">
            <label htmlFor="five" className="text-2xl text-black py-2">
            Shake on it and attempt a solution - Mix multiple options to arrive at the final solution.
            </label>
            <Controller
              control={control}
              name="five"
              render={({ field }) => (
                <textarea
                  id="five"
                  className="border border-black  rounded-lg p-2"
                  placeholder="Enter your thought"
                  {...field}
                />
              )}
            />
          </div>

          <button className="bg-violet-600 w-full py-2 rounded-lg text-white">
            Save as PDF
          </button>
        </form>
      )}
    </div>
  );
};

export default Page;
