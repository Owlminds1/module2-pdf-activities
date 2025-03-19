"use client";
import jsPDF from "jspdf";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type formData = {
  userName: string;
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
    const title = "Positive Self talk";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (210 - titleWidth) / 2, 20); // Center align title

    doc.setFont("helvetica", "normal");
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
    addTextWithLineBreak("", data.userName);
    addTextWithLineBreak("", data.first);
    addTextWithLineBreak("", data.sec);
    addTextWithLineBreak("", data.third);
    addTextWithLineBreak("", data.four);
    addTextWithLineBreak("", data.five);

    doc.save("Positive-self-talk.pdf");
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <h3 className="text-3xl text-black text-center pb-3">
        Positive Self Talk
      </h3>
      <div className="grid grid-cols-12 rounded-lg overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-span-7 flex items-center justify-center w-full  relative h-[500px]"
        >
          <Image
            src="/images/Self_talk.png"
            fill
            alt=" mirror image"
            className="object-contain"
          />
          <h5 className="absolute text-md text-white border border-white top-[50px] right-[42%] min-w-[120px] text-center py-2 bg-yellow-900 rounded-[20px]  ">
            Self Talk
          </h5>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <textarea
                id="userName"
                className="absolute text-black pl-2 pt-5 bg-[#ffffff6d] top-[200px] left-[38%] min-h-[50px] rounded-[20px] outline-none border-2 border-yellow-950   placeholder:text-center placeholder:text-slate-600 focus:border-2 "
                placeholder="Enter Your Name  "
                {...field}
              />
            )}
          />
          <Controller
            name="first"
            control={control}
            render={({ field }) => (
              <textarea
                id="first"
                className="absolute text-black pl-2 pt-5 bg-[#ffffff6d] top-[85px] right-5 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
                placeholder="Enter your Thought  "
                {...field}
              />
            )}
          />

          <Controller
            name="sec"
            control={control}
            render={({ field }) => (
              <textarea
                id="sec"
                className="absolute text-black pl-2 pt-5 bg-[#ffffff6d] top-[190px] right-5 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
                placeholder="Enter your Thought  "
                {...field}
              />
            )}
          />

          <Controller
            name="third"
            control={control}
            render={({ field }) => (
              <textarea
                id="third"
                className="absolute text-black pl-2 pt-5 bg-[#ffffff6d] top-[300px] right-5 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
                placeholder="Enter your Thought  "
                {...field}
              />
            )}
          />

          <Controller
            name="four"
            control={control}
            render={({ field }) => (
              <textarea
                id="four"
                className="absolute text-black pl-2 pt-5 bg-[#ffffff6d] top-[230px] left-3 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
                placeholder="Enter your Thought  "
                {...field}
              />
            )}
          />

          <Controller
            name="five"
            control={control}
            render={({ field }) => (
              <textarea
                id="five"
                className="absolute text-black pl-2 pt-5 bg-[#ffffff6d] top-[325px] left-3 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
                placeholder="Enter your Thought  "
                {...field}
              />
            )}
          />

          <button className=" mirror_btn  absolute text-white  text-xl  bg-red-500  px-10 py-2  bottom-[80px] left-[40%] rounded-[20px]   placeholder:text-center placeholder:text-slate-600 focus:border-2 hover:bg-red-600 ">
            submit
          </button>
        </form>
        <div className="col-span-5 bg-yellow-900 p-5 text-xl flex flex-col gap-4 justify-center items-start text-left">
          <p className="text-white">
            {`Think deeply about what you like about yourself. Focus on your qualities or behaviour towards oneself as well as others. For example, if you help your friends, you can write, ‘I’m helpful’. If you keep your things in their proper place and tidy up, you could write ‘organised.’`}
          </p>
          <p className="text-xl text-white">
            Write on each petal a positive thought about yourself
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
