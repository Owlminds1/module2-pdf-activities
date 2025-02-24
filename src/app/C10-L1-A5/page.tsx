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
    <div className="min-h-screen bg-slate-400 flex flex-col p-5 justify-center items-center">
      <h2 className="text-4xl pb-[50px] text-white">Self talk flower</h2>
      <div className="grid grid-cols-12 w-full p-5  place-items-center  ">
        <div className="col-span-8 bg-[url(/bg/bg_flower.jpg)] rounded-2xl  bg-cover bg-center">
          <div className="w-[700px] h-[700px] relative )] bg-cover bg-center rounded-lg ">
            <Image src="/images/flower.png" layout="fill" alt="jar image" />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="absolute  w-[500px] h-[500px]  rounded-full top-[-20px] right-[150px] flex flex-col justify-center items-center gap-4 px-5"
            >
              <div className="absolute  top-[28px] left-[162px] first_leaf">
                <Controller
                  control={control}
                  name="first"
                  render={({ field }) => (
                    <textarea
                      title="textareas"
                      placeholder="Write here."
                     className=" bg-gradient-to-r from-white to-red-500 w-[160px] min-h-[140px] rounded-[60px] px-2 py-10 bg-transparent backdrop-blur-sm text-black outline-none placeholder:text-slate-800 border border-black placeholder:text-md placeholder:text-center "
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="absolute  top-[82px] right-[20px] sec_leaf">
                <Controller
                  control={control}
                  name="sec"
                  render={({ field }) => (
                    <textarea
                      title="textareas"
                      placeholder="Write here."
                     className=" bg-gradient-to-r from-white to-red-500 w-[160px] min-h-[140px] rounded-[60px] px-2 py-10 bg-transparent backdrop-blur-sm text-black outline-none placeholder:text-slate-800 border border-black placeholder:text-md placeholder:text-center "
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="absolute  top-[238px] right-[15px] third_leaf ">
                <Controller
                  control={control}
                  name="third"
                  render={({ field }) => (
                    <textarea
                      title="textareas"
                      placeholder="Write here."
                       className=" bg-gradient-to-r from-white to-red-500 w-[160px] min-h-[140px] rounded-[60px] px-2 py-10 bg-transparent backdrop-blur-sm text-black outline-none placeholder:text-slate-800 border border-black placeholder:text-md placeholder:text-center "
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="absolute  bottom-[53px] left-[148px] four_leaf">
                <Controller
                  control={control}
                  name="four"
                  render={({ field }) => (
                    <textarea
                      title="textareas"
                      placeholder="Write here."
                      className=" bg-gradient-to-r from-white to-red-500 w-[160px] min-h-[140px] rounded-[60px] px-2 py-10 bg-transparent backdrop-blur-sm text-black outline-none placeholder:text-slate-800 border border-black placeholder:text-md placeholder:text-center "
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="absolute  bottom-[200px] left-[55px] five_leaf">
                <Controller
                  control={control}
                  name="five"
                  render={({ field }) => (
                    <textarea
                      title="textareas"
                      placeholder="Write here."
                      className=" bg-gradient-to-r from-white to-red-500 w-[160px] min-h-[140px] rounded-[60px] px-2 py-10 bg-transparent backdrop-blur-sm text-black outline-none placeholder:text-slate-800 border border-black placeholder:text-md placeholder:text-center "
                      {...field}
                    />
                  )}
                />
              </div>

              <textarea
                placeholder="write Name."
                className=" px-2 py-10 w-[120px] h-[120px]   rounded-full border  absolute top-[48%] left-[278px] translate-x-[-50%] translate-y-[-50%] border-white text-white bg-black placeholder:text-center hover:border-black hover:backdrop-blur-lg placeholder:text-sm"
              />

              <button className="absolute bottom-[-100px]  right-[120px] bg-green-500  border border-green-900 px-10 py-3 rounded-lg hover:bg-green-600">Submit</button>
            </form>
          </div>
        </div>
        <div className="col-span-4 w-full bg-[#F37979] p-4 min-h-[300px] flex justify-center items-center shadow-lg rounded-lg ">
          <div>
           <ul className="list-decimal pl-5 space-y-2 text-lg">
  <li>Write on each petal a positive thought about yourself.</li>
  <li>Think about what you like about yourself.</li>
  <li>
    Focus on your qualities or behaviour towards oneself as well as others. 
    For example, if you help your friends, you can write, <strong>‘I’m helpful’</strong>. 
    If you keep your things in their proper place and tidy up, you could write <strong>‘organised’</strong>.
  </li>
</ul>


            <p className="text-lg py-5 text-white">
              Write on each petal a positive thought about yourself
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
