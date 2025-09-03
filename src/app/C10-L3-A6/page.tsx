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
  examples_1: string;
  sec: string;
  example2: string;
  third: string;
  example3: string;
  four: string;
  example4: string;
  five: string;
  example5: string;
  six: string;
  example6: string;
  seven: string;
  example7: string;
};
const Page = () => {
  const { handleSubmit, control } = useForm<formData>();


const onSubmit = (data: formData) => {
  const doc = new jsPDF();
  const maxWidth = 160;
  const lineSpacing = 7;
  let yPosition = 30;

  // Title
  doc.setFontSize(16);
  const title = "Positive Self talk";
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (210 - titleWidth) / 2, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const addTextWithLineBreak = (label: string, value: string) => {
    const wrappedLabel = doc.splitTextToSize(label, maxWidth);
    const wrappedAnswer = doc.splitTextToSize(value || "N/A", maxWidth);

    if (
      yPosition +
        wrappedLabel.length * lineSpacing +
        wrappedAnswer.length * lineSpacing >
      280
    ) {
      doc.addPage();
      yPosition = 30;
    }

    doc.text(wrappedLabel, 20, yPosition);
    yPosition += wrappedLabel.length * lineSpacing;

    doc.text(wrappedAnswer, 20, yPosition);
    yPosition += wrappedAnswer.length * lineSpacing + 3;
  };

  // Add all fields
  addTextWithLineBreak("Name:", data.userName);

  addTextWithLineBreak("Quality 1:", data.first);
  addTextWithLineBreak("Example 1:", data.examples_1);

  addTextWithLineBreak("Quality 2:", data.sec);
  addTextWithLineBreak("Example 2:", data.example2);

  addTextWithLineBreak("Quality 3:", data.third);
  addTextWithLineBreak("Example 3:", data.example3);

  addTextWithLineBreak("Quality 4:", data.four);
  addTextWithLineBreak("Example 4:", data.example4);

  addTextWithLineBreak("Quality 5:", data.five);
  addTextWithLineBreak("Example 5:", data.example5);

  addTextWithLineBreak("Quality 6:", data.six);
  addTextWithLineBreak("Example 6:", data.example6);

  addTextWithLineBreak("Quality 7:", data.seven);
  addTextWithLineBreak("Example 7:", data.example7);

  doc.save("Positive-self-talk_with_examples.pdf");
};


  return (
    <div className="min-h-screen bg-white p-5">
      <h3 className="text-3xl text-black text-center pb-3">
Positive Self Talk With Examples      </h3>
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
          <div className="absolute flex gap-0.5 flex-col justify-center items-center top-[30px] p-2 right-5 rounded-lg border border-black  "
>
<Controller
            name="first"
            control={control}
            render={({ field }) => (
              <textarea
                id="first"
                className=" text-black text-center h-[30px]  outline-none   placeholder:text-center placeholder:text-slate-600 bg-transparent"
                placeholder="Enter the quality"
                {...field}
              />
            )}
          />
          <div className="h-[1px] w-[100%] bg-[#000000a0]"></div>
          <Controller
            name="examples_1"
            control={control}
            render={({ field }) => (
              <textarea
                id="first"
                className=" text-black text-center h-[60px]  outline-none   placeholder:text-center placeholder:text-slate-600 bg-transparent"
                placeholder="Enter the example"
                {...field}
              />
            )}
          />
          </div>
          

<div className="absolute flex-col justify-center items-center top-[160px] right-5 p-2 rounded-lg border border-black  ">

          <Controller
            name="sec"
            control={control}
            render={({ field }) => (
              <textarea
                id="sec"
                 className=" text-black text-center h-[30px]  outline-none   placeholder:text-center placeholder:text-slate-600 bg-transparent"
                placeholder="Enter the quality"
                {...field}
              />
            )}
          />

                    <div className="h-[1px] w-[100%] bg-[#000000a0]"></div>

<Controller
            name="example2"
            control={control}
            render={({ field }) => (
              <textarea
                id="sec"
                 className=" text-black text-center h-[60px]  outline-none   placeholder:text-center placeholder:text-slate-600 bg-transparent"
                placeholder="Enter the example"
                {...field}
              />
            )}
          />

</div>

<div className="absolute flex gap-0.5 flex-col justify-center items-center top-[300px] right-5 p-2 rounded-lg border border-black  ">

<Controller
            name="third"
            control={control}
            render={({ field }) => (
              <textarea
                id="third"
                 className=" text-black text-center h-[30px]  outline-none   placeholder:text-center placeholder:text-slate-600 bg-transparent"
                placeholder="Enter the quality"
                {...field}
              />
            )}
          />

          <div className="h-[1px] w-[100%] bg-[#000000a0]"></div>

<Controller
            name="example3"
            control={control}
            render={({ field }) => (
              <textarea
                id="sec"
                 className=" text-black text-center h-[60px]  outline-none   placeholder:text-center placeholder:text-slate-600 bg-transparent"
                placeholder="Enter the example"
                {...field}
              />
            )}
          />
</div>

          
{/* FOUR */}
<div className="absolute flex gap-0.5 flex-col justify-center items-center top-[10px] left-3 p-2 rounded-lg border border-black bg-[#ffffff6d]">
  <Controller
    name="four"
    control={control}
    render={({ field }) => (
      <textarea
        id="four"
        className="text-black text-center h-[30px] outline-none placeholder:text-center placeholder:text-slate-600 bg-transparent"
        placeholder="Enter the quality"
        {...field}
      />
    )}
  />
  <div className="h-[1px] w-full bg-[#000000a0]"></div>
  <Controller
    name="example4"
    control={control}
    render={({ field }) => (
      <textarea
        id="example4"
        className="text-black text-center h-[60px] outline-none placeholder:text-center placeholder:text-slate-600 bg-transparent"
        placeholder="Enter the example"
        {...field}
      />
    )}
  />
</div>

{/* FIVE */}
<div className="absolute flex gap-0.5 flex-col justify-center items-center top-[130px] left-3 p-2 rounded-lg border border-black bg-[#ffffff6d]">
  <Controller
    name="five"
    control={control}
    render={({ field }) => (
      <textarea
        id="five"
        className="text-black text-center h-[30px] outline-none placeholder:text-center placeholder:text-slate-600 bg-transparent"
        placeholder="Enter the quality"
        {...field}
      />
    )}
  />
  <div className="h-[1px] w-full bg-[#000000a0]"></div>
  <Controller
    name="example5"
    control={control}
    render={({ field }) => (
      <textarea
        id="example5"
        className="text-black text-center h-[60px] outline-none placeholder:text-center placeholder:text-slate-600 bg-transparent"
        placeholder="Enter the example"
        {...field}
      />
    )}
  />
</div>

{/* SIX */}
<div className="absolute flex gap-0.5 flex-col justify-center items-center top-[250px] left-3 p-2 rounded-lg border border-black bg-[#ffffff6d]">
  <Controller
    name="six"
    control={control}
    render={({ field }) => (
      <textarea
        id="six"
        className="text-black text-center h-[30px] outline-none placeholder:text-center placeholder:text-slate-600 bg-transparent"
        placeholder="Enter the quality"
        {...field}
      />
    )}
  />
  <div className="h-[1px] w-full bg-[#000000a0]"></div>
  <Controller
    name="example6"
    control={control}
    render={({ field }) => (
      <textarea
        id="example6"
        className="text-black text-center h-[60px] outline-none placeholder:text-center placeholder:text-slate-600 bg-transparent"
        placeholder="Enter the example"
        {...field}
      />
    )}
  />
</div>

{/* SEVEN */}
<div className="absolute flex gap-0.5 flex-col justify-center items-center top-[370px] left-3 p-2 rounded-lg border border-black bg-[#ffffff6d]">
  <Controller
    name="seven"
    control={control}
    render={({ field }) => (
      <textarea
        id="seven"
        className="text-black text-center h-[30px] outline-none placeholder:text-center placeholder:text-slate-600 bg-transparent"
        placeholder="Enter the quality"
        {...field}
      />
    )}
  />
  <div className="h-[1px] w-full bg-[#000000a0]"></div>
  <Controller
    name="example7"
    control={control}
    render={({ field }) => (
      <textarea
        id="example7"
        className="text-black text-center h-[60px] outline-none placeholder:text-center placeholder:text-slate-600 bg-transparent"
        placeholder="Enter the example"
        {...field}
      />
    )}
  />
</div>

          <button className=" mirror_btn  absolute text-white  text-xl  bg-red-500  px-10 py-2  bottom-[10px] left-[41%] rounded-[20px]   placeholder:text-center placeholder:text-slate-600 focus:border-2 hover:bg-red-600 ">
            submit
          </button>
        </form>
        <div className="col-span-5 border bg-[#F8FCFA] p-5 text-xl flex flex-col gap-10 justify-start  items-start text-left">
          <h3 className="text-black text-center w-full text-2xl font-bold">Select any seven qualities that define you</h3>
          <ul className="flex flex-wrap justify-center items-center  gap-2">
            {listData.map((i, index) => (
              <li
                key={index}
                style={{ border: `2px solid ${i.border}` }}
                className="border text-[15px] text-black px-3 py-1 rounded-full"
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
