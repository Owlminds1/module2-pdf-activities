"use client";
import Image from "next/image";
import jsPDF from "jspdf";
import React from "react";
import { useForm, Controller } from "react-hook-form";
type formData = {
  first: string;
};
const Page = () => {
  const { control, handleSubmit } = useForm<formData>();

  const onSubmit = (data:formData) => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text(
      'Think about your strengths and talents. Imagine you’ve been given a magic wand, and you can change anything you want to change in yourself.',
      105,
      20,
      { maxWidth: 180, align: 'center' }
    );

    pdf.setFontSize(15);
    pdf.text(
      'What would you want to be different?',
      10,
      50,
      { maxWidth: 180 }
    );

    pdf.setFontSize(12);
    pdf.text(`Answer: ${data.first}`, 10, 65, { maxWidth: 180 });

    pdf.save('your_thoughts.pdf');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-center flex flex-col justify-start tems-center p-5 ">
      <h4 className="text-2xl text-black  h-[100px] ">
        Think about your strengths and talents. Imagine you’ve been given a
        magic wand, <br /> and you can change anything you want to change in
        yourself.
      </h4>
      <div className="grid grid-cols-12 h-full place-items-center">
        <div className="col-span-6  ">
          <Image
            src="/images/magical_stick.jpg"
            width={400}
            height={100}
            alt="image"
            className="rounded-lg"
          />
        </div>
        <div className="col-span-6 border border-black rounded-lg w-full h-full flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <label htmlFor="qustion" className="text-3xl text-black">
              What would you want to be different?
            </label>
            <Controller
              control={control}
              name="first"
              render={({ field }) => (
                <textarea
                  title="textareas"
                  placeholder="Enter yor thoughts "
                  className="border-b border-black bg-transparent outline-none text-black"
                  {...field}
                />
              )}
            />
            <button className="bg-blue-500 px-5 py-2 rounded-lg">
              Save as PDF
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
