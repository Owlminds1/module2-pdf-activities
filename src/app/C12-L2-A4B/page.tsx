"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import jsPDF from "jspdf";

type FormData = Record<string, string>;

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
    let currentY = 20;

    // ✅ Title ko center align karna
    const title =
      " Your request to get a new board game/book";
    const titleLines = doc.splitTextToSize(title, contentWidth);
    
    titleLines.forEach((line: string, index: number) => {
      doc.text(line, pageWidth / 2, currentY + index * 6, { align: "center" });
    });

    currentY += titleLines.length * 6 + 10;

    const questions = [
      { key: "step_1", question: "Why do you want it?" },
      { key: "step_2", question: "Why do you want it now?" },
      { key: "step_3", question: "How will you ensure responsible use?" },
      { key: "step_4", question: "What will you promise to do?" },
      { key: "step_5", question: "What would happen if you did not get it?" },
    ];

    questions.forEach(({ key, question }) => {
      if (data[key]?.trim()) {
        doc.text(`Q: ${question}`, marginLeft, currentY);
        const answerLines = doc.splitTextToSize(data[key], contentWidth);
        answerLines.forEach((line: string, index: number) => {
          doc.text(line, marginLeft + 5, currentY + (index + 1) * 6);
        });
        currentY += answerLines.length * 6 + 8;
      }
    });

    doc.save("Script.pdf");
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC]">
      <div className="p-5 font-bold">
        <h1 className="text-center text-[25px] text-blue-500">
        Request your parents to get a new board game/book and make a strong case for it.
        </h1>
      </div>
      <div className="flex items-center justify-center mt-5 p-5 text-white">
        <div className="bg-blue-500 shadow-xl p-5 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="min-w-[800px]">
            {[
              { name: "step_1", label: "Why do you want it?" },
              { name: "step_2", label: "Why do you want it now?" },
              { name: "step_3", label: "How will you ensure responsible use?" },
              { name: "step_4", label: "What will you promise to do?" },
              { name: "step_5", label: "What would happen if you did not get it?" },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col p-2 gap-2">
                <label htmlFor={name} className="text-xl font-bold py-2">
                  {label}
                </label>
                <Controller
                  control={control}
                  defaultValue=""
                  name={name}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id={name}
                      placeholder="Type your answer here..."
                      className="min-h-[60px] rounded-md p-2 border border-[#3DCCC7] focus:outline-[#3DCCC7] bg-white text-black placeholder:text-slate-400"
                    />
                  )}
                />
              </div>
            ))}

            <div className="p-5">
              <button className="bg-blue-800 rounded-lg p-2 text-white w-full hover:bg-blue-900">
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
