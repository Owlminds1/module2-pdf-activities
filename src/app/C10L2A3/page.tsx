"use client";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import jsPDF from "jspdf";
import carectorData from "@/lib/data.json";
import GridForm from "@/components/gridForm";

// ✅ Define form data type
type FormData = { [key: string]: string };

const Page = () => {
  const { handleSubmit, control } = useForm<FormData>();

  // ✅ Handles form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
    createPdf(data);
  };

  // ✅ PDF Generation Function
  const createPdf = (formData: FormData) => {
    const doc = new jsPDF();
    const marginLeft = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - marginLeft * 2;
    let currentY = 10;

    // ✅ Title
    doc.setFontSize(15);
    doc.text(
      "Think of a difficult situation in which you got nervous or scared.",
      pageWidth / 2,
      currentY,
      { align: "center" }
    );
    currentY += 10;

    // ✅ Loop through character data and add questions + responses
    carectorData.forEach((item) => {
      doc.setFontSize(12);
      doc.text(`${item.questions}`, marginLeft, currentY);
      currentY += 6;

      // ✅ Get response or default value
      const answer = formData[item.name] || "No response provided";

      // ✅ Use splitTextToSize for proper text wrapping
      const eventLines = doc.splitTextToSize(answer, contentWidth);
      doc.text(eventLines, marginLeft, currentY);
      currentY += eventLines.length * 6;

      // ✅ Add some spacing
      currentY += 4;
    });

    doc.save("character_responses.pdf");
  };

  return (
    <div className="min-w-[800px] min-h-screen bg-slate-400 p-5">
      <h3 className="text-center font-bold text-xl text-black">
        Step 1: Describe the situation.
      </h3>
      <div className="flex flex-col justify-center items-center">
        <div className="text-black text-center rounded-lg p-2">
          <h2 className="text-2xl py-2 font-bold text-black text-center">
            Where are you when this happens? Who all are around you?
          </h2>
          <h1>E.g. Darkness/Spiders/Height/Stage performance/Tests</h1>
        </div>

        {/* ✅ Improved Form Handling */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-[600px]">
          {carectorData.map((item, index) => (
            <div
              key={index}
              className="w-full text-black p-3 my-2 rounded-lg"
              style={{ backgroundColor: `${item.bgcolor}` }}
            >
              <h1>{item.example}</h1>
              <h2 className="text-xl py-2 font-bold">{item.questions}</h2>
              <Controller
                control={control}
                name={item.name}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Enter your response"
                    maxLength={100}
                    className="p-1 w-[300px] rounded-md border border-gray-500"
                  />
                )}
              />
            </div>
          ))}

          {/* ✅ Improved Button Styling */}
          <button
            type="submit"
            className="w-full bg-green-600 py-2 px-5 rounded text-white font-semibold hover:bg-green-700 transition-all"
          >
            Save My Responses
          </button>
        </form>
      </div>

      {/* ✅ Step 2 Section */}
      <div className="mt-10">
        <h3 className="text-center font-bold text-xl text-black">
          Step 2: Create a list of fear-inducing situations related to the
          specific phobia, ranking them from least anxiety-provoking to most.
        </h3>
        <GridForm />
      </div>
    </div>
  );
};

export default Page;
