"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import jsPDF from "jspdf";

type FormData = Record<string, string | boolean>;

const Page = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: FormData) => {
    createPdf(data);
  };

  const createPdf = (data: FormData) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    const marginLeft = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - marginLeft * 2;
    const pageHeight = doc.internal.pageSize.getHeight(); // Page height
    let currentY = 20;

    // ✅ Title ko center align karna
    const title =
      "Think of a difficult situation that makes you anxious or worried";
    const titleLines = doc.splitTextToSize(title, contentWidth);
    const titleHeight = titleLines.length * 6; // Calculate title height

    titleLines.forEach((line: string, index: number) => {
      doc.text(line, pageWidth / 2, currentY + index * 6, { align: "center" });
    });

    currentY += titleHeight + 10; // Thoda space de rahe hain

    const questions = [
      {
        key: "step_1",
        question: "Where are you when this happens? Who all are around you?",
      },
      {
        keys: ["step_2", "step_3"],
        question: "Is it real or I imagine it?",
        options: [
          { key: "step_2", label: "This has really happened" },
          { key: "step_3", label: "I think it might happen" },
        ],
      },
      {
        keys: ["step_4", "step_5"],
        question: "Is it possible to actually come true?",
        options: [
          { key: "step_4", label: "Very Likely" },
          { key: "step_5", label: "Not Likely" },
        ],
      },
      {
        key: "step_6",
        question: "What's the worst that can happen if it comes true?",
      },
      {
        keys: ["step_7", "step_8"],
        question: "Will it matter to me tomorrow or in the future?",
        options: [
          { key: "step_7", label: "Yes, very much" },
          { key: "step_8", label: "Not much" },
        ],
      },
      {
        key: "step_9",
        question: "What can I do to handle the situation in a better way?",
      },
    ];

    const addMultilineText = (
      label: string,
      text: string,
      yOffset: number,
      lineSpacing = 5
    ) => {
      const lines = doc.splitTextToSize(text, contentWidth);

      // ✅ Page overflow check
      if (yOffset + lines.length * lineSpacing + 10 > pageHeight) {
        doc.addPage();
        yOffset = 20; // Reset position on new page
      }

      doc.text(label, marginLeft, yOffset);
      lines.forEach((line: string, index: number) => {
        doc.text(line, marginLeft + 5, yOffset + (index + 1) * lineSpacing);
      });

      return yOffset + lines.length * lineSpacing + 4;
    };

    questions.forEach(({ key, question, options }) => {
      currentY = addMultilineText(`Q: ${question}`, "", currentY + 6, 5);

      if (options) {
        options.forEach(({ key, label }) => {
          const isChecked = data[key] === true ? "Yes" : "No";
          currentY = addMultilineText(
            `   - ${label}: ${isChecked}`,
            "",
            currentY + 3,
            4
          ); // ⬅️ Option ke beech bhi gap kam kiya
        });
      } else {
        currentY = addMultilineText(
          ``,
          String(data[key]) || "N/A",
          currentY + 3,
          4
        );
      }
    });

    doc.save("difficult-situation.pdf");
  };

  return (
    <div className=" min-h-screen w-full  bg-gray-200">
      <div className=" p-10 font-bold">
        <h1 className="text-center text-[25px] text-[#B771E5]">
        Think of a difficult situation that makes you anxious or worried
        </h1>
      </div>
      <div className="  flex items-center justify-center mt-5 p-5 text-white ">
        <div className="bg-[#B771E5] shadow-xl  p-5 rounded-lg ">
          <form onSubmit={handleSubmit(onSubmit)} className="min-w-[800px]">
            <div className="flex flex-col  p-2 gap-2">
              <label htmlFor="step_1" className="text-xl font-bold py-2">
                Where are you when this happens? Who all are around you?{" "}
              </label>
              <Controller
                control={control}
                defaultValue=""
                name="step_1"
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="step_1"
                    placeholder="Type your answer here..."
                    className="min-h-[60px] rounded-md p-2 border border-1 border-[#3DCCC7] focus:outline-[#3DCCC7] bg-white text-black placeholder:text-slate-400"
                  />
                )}
              />
            </div>
            {/* ========================= checkbox ============================ */}
            <div className="flex flex-col  p-2 gap-2">
              <label htmlFor="step_2" className="text-xl font-bold py-2">Is it real or I imagine it?</label>
              <div className="flex gap-1 items-center px-5 py-3">
                <Controller
                  control={control}
                  defaultValue={false}
                  name="step_2"
                  render={({ field }) => (
                    <input
                      {...field}
                      id="step_2"
                      type="checkbox"
                      className="w-6 h-6 rounded-full mx-2 p-2 border border-1 border-[#3DCCC7] focus:outline-[#3DCCC7] bg-white placeholder:text-slate-600"
                    />
                  )}
                />
                <span className="text-lg" >This has really happened OR </span>
              </div>

              <div className="flex gap-1 items-center px-5 py-3">
                <Controller
                  control={control}
                  defaultValue={false}
                  name="step_3"
                  render={({ field }) => (
                    <input
                      {...field}
                      id="step_3"
                      type="checkbox"
                      className="w-6 h-6 rounded-full mx-2 p-2 border border-1 border-[#3DCCC7] focus:outline-[#3DCCC7] bg-white placeholder:text-slate-600"
                    />
                  )}
                />
                <span className="text-lg">I think might happen</span>
              </div>
            </div>

            <div className="flex flex-col  p-2 gap-2">
              <label htmlFor="step_4" className="text-xl font-bold py-2">
                Is it possible to actually come true?
              </label>
              <div className="flex gap-1 items-center px-5 py-3">
                <Controller
                  control={control}
                  defaultValue={false}
                  name="step_4"
                  render={({ field }) => (
                    <input
                      {...field}
                      id="step_4"
                      type="checkbox"
                      placeholder="Type your answer here..."
                      className="w-6 h-6 rounded-full mx-2 p-2 border border-1 border-[#3DCCC7] focus:outline-[#3DCCC7] bg-white placeholder:text-slate-600"
                    />
                  )}
                />
                <span className="text-lg">Very Likely </span>
              </div>

              <div className="flex gap-1 items-center px-5 py-3">
                <Controller
                  control={control}
                  defaultValue={false}
                  name="step_5"
                  render={({ field }) => (
                    <input
                      {...field}
                      id="step_5"
                      type="checkbox"
                      placeholder="Type your answer here..."
                      className="w-6 h-6 rounded-full mx-2 p-2 border border-1 border-[#3DCCC7] focus:outline-[#3DCCC7] bg-white placeholder:text-slate-600"
                    />
                  )}
                />
                <span className="text-lg">Not likely</span>
              </div>
            </div>
            {/* ========================= checkbox ============================ */}

            <div className="flex flex-col  p-2 gap-2">
              <label htmlFor="step_6" className="text-xl font-bold py-2">
                What s the worst that can happen if it comes true?
              </label>
              <Controller
                control={control}
                defaultValue=""
                name="step_6"
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="step_6"
                  
                    placeholder="Type your answer here..."
                    className="min-h-[60px] rounded-md p-2 border border-1 border-[#3DCCC7] focus:outline-[#3DCCC7] bg-white text-black placeholder:text-slate-400"
                  />
                )}
              />
            </div>
            <div className="flex flex-col  p-2 gap-2">
              <label htmlFor="step_7" className="text-xl font-bold py-2">
                Will it matter to me tomorrow or in future?
              </label>
              <div className="flex gap-1 items-center px-5 py-3">
                <Controller
                  control={control}
                  defaultValue={false}
                  name="step_7"
                  render={({ field }) => (
                    <input
                      {...field}
                      id="step_7"
                      type="checkbox"
                      placeholder="Type your answer here..."
                      className="w-6 h-6 rounded-full mx-2 p-2 border border-1 border-[#3DCCC7] focus:outline-[#3DCCC7] bg-white placeholder:text-slate-600"
                    />
                  )}
                />
                <span className="text-lg">Yes, very much</span>
              </div>

              <div className="flex gap-1 items-center px-5 py-3">
                <Controller
                  control={control}
                  defaultValue={false}
                  name="step_8"
                  render={({ field }) => (
                    <input
                      {...field}
                      id="step_8"
                      type="checkbox"
                      className="w-6 h-6 rounded-full mx-2 p-2 border border-1 border-[#3DCCC7] focus:outline-[#3DCCC7] bg-white placeholder:text-slate-600"
                    />
                  )}
                />
                <span className="text-lg">Not much</span>
              </div>
            </div>

            <div className="flex flex-col  p-2 gap-2">
              <label htmlFor="step_9" className="text-xl font-bold py-2">
                What can I do to handle the situation in a better way?
              </label>
              <Controller
                control={control}
                defaultValue=""
                name="step_9"
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="step_9"
                    placeholder="Type your answer here..."
                    className="min-h-[60px] rounded-md p-2 border border-1 border-[#3DCCC7] focus:outline-[#3DCCC7] bg-white text-black placeholder:text-slate-600"
                  />
                )}
              />
            </div>

            <div className="p-5">
              <button className="bg-[#441752] rounded-lg p-2 text-white w-full hover:bg-[#69247C] ">
                Print or Save as PDF
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
