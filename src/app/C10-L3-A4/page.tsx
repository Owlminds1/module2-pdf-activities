"use client";
import jsPDF from "jspdf";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const listData = [
  { name: "Cooperative", border: "#b55f49" },
  { name: "Disciplined", border: "#5aaf65" },
  { name: "Patient", border: "#c51385" },
  { name: "Respectful", border: "#32658a" },
  { name: "Determined", border: "#b55f49" },
  { name: "Honest", border: "#5aaf65" },
  { name: "Balanced", border: "#c51385" },
  { name: "Punctual", border: "#32658a" },
  { name: "Innovative​", border: "#b55f49" },
  { name: "Motivated", border: "#5aaf65" },
  { name: "Professional", border: "#32658a" },
  { name: "Practical", border: "#b55f49" },
  { name: "Responsible", border: "#32658a" },
  { name: "Open minded", border: "#c51385" },
  { name: "Organized", border: "#c51385" },
  { name: "Storyteller", border: "#32658a" },
  { name: "Likable", border: "#b55f49" },
  { name: "Persuasive", border: "#32658a" },
  { name: "Detail-oriented", border: "#b55f49" },
  { name: "Focused", border: "#c51385" },
  { name: "Genuine", border: "#5aaf65" },
  { name: "Responsible", border: "#b55f49" },
  { name: "Smart", border: "#5aaf65" },
  { name: "Thoughtful", border: "#c51385" },
];

type formData = {
  userName: string;
  first: string;
  sec: string;
  third: string;
  four: string;
  five: string;
  six: string;
  seven: string;
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
    addTextWithLineBreak("", data.six);
    addTextWithLineBreak("", data.seven);

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
          className="col-span-7 flex items-center justify-center w-full  relative h-[520px]"
        >
          <Image
            src="/images/Self_talk2.png"
            fill
            alt=" mirror image"
            className="object-contain"
          />

          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <textarea
                id="userName"
                className="absolute text-black text-center pl-2 pt-5 bg-[#ffffff6d] top-[150px] left-[38%] min-h-[50px] rounded-[20px] outline-none border-2 border-yellow-950   placeholder:text-center placeholder:text-slate-600 focus:border-2 "
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
                className="absolute text-black text-center pl-2 pt-5 bg-[#ffffff6d] top-[85px] right-5 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
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
                className="absolute text-black text-center pl-2 pt-5 bg-[#ffffff6d] top-[190px] right-5 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
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
                className="absolute text-black text-center pl-2 pt-5 bg-[#ffffff6d] top-[300px] right-5 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
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
                className="absolute text-black text-center pl-2 pt-5 bg-[#ffffff6d] top-[230px] left-3 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
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
                className="absolute text-black text-center pl-2 pt-5 bg-[#ffffff6d] top-[325px] left-3 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
                placeholder="Enter your Thought  "
                {...field}
              />
            )}
          />

          <Controller
            name="six"
            control={control}
            render={({ field }) => (
              <textarea
                id="six"
                className="absolute text-black text-center pl-2 pt-5 bg-[#ffffff6d] top-[130px] left-3 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
                placeholder="Enter your Thought  "
                {...field}
              />
            )}
          />

          <Controller
            name="seven"
            control={control}
            render={({ field }) => (
              <textarea
                id="seven"
                className="absolute text-black text-center pl-2 pt-5 bg-[#ffffff6d] top-[30px] left-3 min-h-[80px] rounded-[20px] outline-none border border-black  placeholder:text-center placeholder:text-slate-600 focus:border-2 "
                placeholder="Enter your Thought  "
                {...field}
              />
            )}
          />

          <button className=" mirror_btn  absolute text-white  text-xl  bg-red-500  px-10 py-2  bottom-[10px] left-[41%] rounded-[20px]   placeholder:text-center placeholder:text-slate-600 focus:border-2 hover:bg-red-600 ">
            submit
          </button>
        </form>
        <div className="col-span-5 border bg-[#F8FCFA] p-5 text-xl flex flex-col gap-4 justify-center items-start text-left">
          <ul className="flex flex-wrap justify-center items-center  gap-2">
            {listData.map((i, index) => (
              <li
                key={index}
                style={{ border: `2px solid ${i.border}` }}
                className="border text-black px-8 py-2 rounded-lg"
              >
                {i.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
