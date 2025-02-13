"use client";
import jsPDF from "jspdf";
import React from "react";
import { useForm, Controller } from "react-hook-form";

type formData = {
  first: string;
  sec: string;
  third: string;
  four: string;
  five: string;
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
    const title = "The best possible version of yourself in the future. ";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (210 - titleWidth) / 2, 20); // Center align title
    doc.setFontSize(12);

    // Function to add text with line break
    const addTextWithLineBreak = (label: string, value: string) => {
      const wrappedLabel = doc.splitTextToSize(label, maxWidth);
      const wrappedAnswer = doc.splitTextToSize(value || "N/A", maxWidth);

      // Check if text exceeds page limit
      if (
        yPosition +
          wrappedLabel.length * lineSpacing +
          wrappedAnswer.length * lineSpacing >
        280
      ) {
        doc.addPage();
        yPosition = 30; // Reset Y position for new page
      }

      // Add label
      doc.text(wrappedLabel, 20, yPosition);
      yPosition += wrappedLabel.length * lineSpacing;

      // Add answer below label
      doc.text(wrappedAnswer, 20, yPosition);
      yPosition += wrappedAnswer.length * lineSpacing + 3; // Adjusted space
    };

    doc.setFontSize(12);
    addTextWithLineBreak("1. Who would you be? :", data.first);
    addTextWithLineBreak("2. What would be your strengths and how would you be using them?  :", data.sec);
    addTextWithLineBreak("3. Where would you be? What would you be doing? :", data.third);
    addTextWithLineBreak("4. What do you do that shows these strengths? :", data.four);
    addTextWithLineBreak("5. How do your strengths benefit others? Think through what it actually means that you have these strengths. :", data.five);
    doc.save("possible-version-of-yourself.pdf");
  };

  return (
    <div className=" p-5 bg-slate-500 min-h-screen text-black flex flex-col justify-center items-center">
      <h3 className="text-white text-2xl font-bold py-3 w-[700px] text-center">
      Imagine the best possible version of yourself in the future. 

      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center flex-col gap-8 bg-gray-300 shadow-lg p-5 py-8 rounded-lg"
      >
      
       <label  className="text-lg w-full" htmlFor="first">
       Who would you be? 
       <Controller
          name="first"
          control={control}
          render={({ field }) => (
            <textarea
              id="first"
              className=" w-full rounded-lg bg-white border-b border-black outline-none px-5 pt-2"
              {...field}
            />
          )}
        />
        </label>
        


        <label htmlFor="sec" className="w-[500px] text-lg">
        What would be your strengths and how would you be using them?
          <Controller
            name="sec"
            control={control}
            render={({ field }) => (
                <textarea
                id="sec"
                className=" w-full rounded-lg bg-white  border-b border-black outline-none px-5 pt-2"
                {...field}
              />
            )}
          />
        </label>

        <label htmlFor="third" className="w-[500px] text-lg">
        Where would you be? What would you be doing?
          <Controller
            name="third"
            control={control}
            render={({ field }) => (
                <textarea
                id="third"
                className=" w-full rounded-lg bg-white  border-b border-black outline-none px-5 pt-2"
                {...field}
              />
            )}
          />
        </label>

        <label htmlFor="four" className="w-[500px] text-lg">
        What do you do that shows these strengths?

          <Controller
            name="four"
            control={control}
            render={({ field }) => (
                <textarea
                id="four"
                className=" w-full rounded-lg bg-white  border-b border-black outline-none px-5 pt-2"
                {...field}
              />
            )}
          />
        </label> 
        
         <label htmlFor="five" className="w-[500px] text-lg">
         How do your strengths benefit others? Think through what it actually means that you have these strengths.

          <Controller
            name="five"
            control={control}
            render={({ field }) => (
                <textarea
                id="five"
                className=" w-full rounded-lg bg-white  border-b border-black outline-none px-5 pt-2"
                {...field}
              />
            )}
          />
        </label>



        <div>
          <button className="bg-[#07BEB8] px-5 py-2 rounded-lg text-white">
            Submit My Response
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
