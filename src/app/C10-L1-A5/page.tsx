"use client";
import Image from "next/image";
import jsPDF from "jspdf";
import React from "react";
import { useForm, Controller } from "react-hook-form";
type formData = {
  first: string;
  sec: string;
  third: string;
  four: string;
  five: string;
  six: string;
};
const Page = () => {
  const { handleSubmit, control } = useForm<formData>();

  const onSubmit = (data: formData) => {
    const doc = new jsPDF();
    const maxWidth = 160; // Max width before text wraps
    const lineSpacing = 7; // Reduced space between lines
    let yPosition = 30; // Initial Y position for content

    // **Title Centering**
    doc.setFontSize(16);
    const title = " Your Feeling ";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (210 - titleWidth) / 2, 20); // Center align title
    doc.setFontSize(12);

    // Function to add text with line break
    const addTextWithLineBreak = (value: string) => {
      const wrappedAnswer = doc.splitTextToSize(value || "N/A", maxWidth);

      // Check if text exceeds page limit
      if (yPosition + wrappedAnswer.length * lineSpacing > 280) {
        doc.addPage();
        yPosition = 30; // Reset Y position for new page
      }

      // Add label

      // Add answer below label
      doc.text(wrappedAnswer, 20, yPosition);
      yPosition += wrappedAnswer.length * lineSpacing + 3; // Adjusted space
    };

    doc.setFontSize(12);
    addTextWithLineBreak(data.first);
    addTextWithLineBreak(data.sec);
    addTextWithLineBreak(data.third);
    addTextWithLineBreak(data.four);
    addTextWithLineBreak(data.five);
    addTextWithLineBreak(data.six);
    doc.save("video-advertisement-script.pdf");
  };
  return (
    <div className="min-h-screen bg-slate-400 flex justify-center items-center">
      <div className="grid grid-cols-12 w-full p-5  ">
        <div className="col-span-8 w-full  flex items-center justify-center  ">
          <div className="w-[600px] h-[600px] relative bg-[url(/bg/flowerBg.jpg)] bg-cover bg-center rounded-lg shadow-2xl">
            <Image src="/images/flower.png" layout="fill" alt="jar image" />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="absolute  w-[400px] h-[400px] rounded-full top-[-20px] right-[120px] flex flex-col justify-center items-center gap-4 px-5"
            >
             <div className="absolute  top-[50px] left-[110px]">
             <Controller
                control={control}
                name="first"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                    className=" bg-gradient-to-r from-white to-red-500 w-[120px] min-h-[80px] rounded-[50px] px-2 bg-transparent backdrop-blur-sm text-black outline-none placeholder:text-black  border-black "
                    {...field}
                  />
                )}
              />
             </div>


             <div className="absolute  top-[100px] right-[20px]">
             <Controller
                control={control}
                name="sec"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                     className=" bg-gradient-to-r from-white to-red-500 w-[120px] min-h-[80px] rounded-[50px] px-2 bg-transparent backdrop-blur-sm text-black outline-none placeholder:text-black  border-black "
                    {...field}
                  />
                )}
              />
             </div>

             <div className="absolute  top-[220px] right-[15px]">
             <Controller
                control={control}
                name="third"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                      className=" bg-gradient-to-r from-white to-red-500 w-[120px] min-h-[80px] rounded-[50px] px-2 bg-transparent backdrop-blur-sm text-black outline-none placeholder:text-black  border-black "
                    {...field}
                  />
                )}
              />
             </div>

             <div className="absolute  bottom-[40px] left-[100px]">
             <Controller
                control={control}
                name="four"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                     className=" bg-gradient-to-r from-white to-red-500 w-[120px] min-h-[80px] rounded-[50px] px-2 bg-transparent backdrop-blur-sm text-black outline-none placeholder:text-black  border-black "
                    {...field}
                  />
                )}
              />
             </div>

             <div className="absolute  bottom-[160px] left-[8px]">
             <Controller
                control={control}
                name="five"
                render={({ field }) => (
                  <input
                    title="inputs"
                    placeholder="Enter Something.. "
                    type="text"
                     className=" bg-gradient-to-r from-white to-red-500 w-[120px] min-h-[80px] rounded-[50px] px-2 bg-transparent backdrop-blur-sm text-black outline-none placeholder:text-black  border-black "
                    {...field}
                  />
                )}
              />
             </div>

              

              <div className="absolute top-[53%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <button className=" px-2 w-[70px] h-[70px] py-1 rounded-full border border-white text-white bg-black hover:bg-red-200 hover:text-black hover:border-black hover:backdrop-blur-lg">
                  submit
                </button>
              </div> 
            </form>
          </div>
        </div>
        <div className="col-span-4 w-full  place-content-center">
          <div className=" px-8 bg-white  rounded-lg shadow-lg py-2 ">
            {/* <h3 className="text-2xl font-bold text-center text-black">
              What makes you feel brave?
            </h3> */}
            <p className="text-lg text-black">
            Think deeply about what you like about yourself. Focus on your qualities or behaviour towards oneself as well as others. For example, if you help your friends, you can write, ‘I’m helpful’. If you keep your things in their proper place and tidy up, you could write ‘organised.’
            </p>

            <p className="text-lg py-2 text-black">
            Write on each petal a positive thought about yourself
            </p>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Page;
