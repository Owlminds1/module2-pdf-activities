import filledContent from "@/lib/filledContent.json";
import gridFormData from "@/lib/gridFormData.json";
import { Controller, useForm } from "react-hook-form";
import jsPDF from "jspdf";

const GridForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: gridFormData.reduce((acc, item) => {
      acc[`text_${item.name}`] = "";
      acc[`rating_${item.name}`] = "";
      return acc;
    }, {} as Record<string, string>),
  });

  const onSubmit = (data: Record<string, string | number>) => {
    createPdf(data);
  };

  const createPdf = (data: Record<string, string | number>) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    const marginLeft = 10;
    const marginTop = 20;
    const rowHeight = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    // const contentWidth = pageWidth - marginLeft * 2;
    let currentY = marginTop;

    doc.text("Action and Behaviour Rating", pageWidth / 2, currentY, {
      align: "center",
    });
    currentY += 10;

    gridFormData.forEach((item) => {
      if (currentY + rowHeight > doc.internal.pageSize.getHeight() - 10) {
        doc.addPage();
        currentY = marginTop;
      }

      const textValue = data[`text_${item.name}`] || "N/A";
      const rating = data[`rating_${item.name}`] || "N/A";

      const wrappedText = doc.splitTextToSize(String(textValue), 140);

      const textHeight = wrappedText.length * 5;
      const boxHeight = Math.max(rowHeight, textHeight + 5);

      doc.rect(marginLeft, currentY, 150, boxHeight);
      doc.text(wrappedText, marginLeft + 5, currentY + 10);

      doc.rect(165, currentY, 30, boxHeight);
      doc.text(String(rating), 175, currentY + 10);

      currentY += boxHeight + 5;
    });

    doc.save("Generated_List.pdf");
  };

  return (
    <div className="p-2 flex justify-center items-center text-black">
      <div className="flex flex-col w-full">
        {filledContent.map((items, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 my-1">
            <div className="col-span-9 w-full">
              {index == 0 ? (
                <h1 className="text-center pt-2 min-h-[50px] font-bold bg-white border border-black">
                  {items.Behaviour}
                </h1>
              ) : (
                <h1 className="p-2 w-full rounded-md bg-red-500 min-h-[60px] text-white">
                  {items.Behaviour}
                </h1>
              )}
            </div>

            <div className="col-span-3 flex items-center rounded-2xl">
              {index == 0 ? (
                <h1 className="text-center font-bold bg-white h-full w-[90px] rounded-lg border border-black pt-2">
                  {items.rating}
                </h1>
              ) : (
                <h2 className="w-[90px] min-h-[50px] rounded-lg pt-2 pr-2 bg-red-500 text-center border border-black text-white placeholder:text-white">
                  {items.rating}
                </h2>
              )}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full p-4 text-black mt-10"
      >
        {gridFormData.map((items, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 my-1">
            <div className="col-span-9 w-full">
              {index == 0 ? (
                <h1 className="text-center pt-2 min-h-[50px] font-bold bg-white border border-black">
                  {items.Behaviour}
                </h1>
              ) : (
                <Controller
                  control={control}
                  name={`text_${items.name}`}
                  render={({ field }) => (
                    <textarea
                      className="p-2 w-full rounded-md bg-red-500 h-[55px] text-white border border-black placeholder:text-white"
                      placeholder="Enter Action/Behaviour......"
                      {...field}
                    />
                  )}
                />
              )}
            </div>

            <div className="col-span-3 flex items-center rounded-2xl">
              {index == 0 ? (
                <h1 className="text-center font-bold bg-white h-full w-[90px] rounded-lg border border-black pt-2">
                  {items.name}
                </h1>
              ) : (
                <Controller
                  control={control}
                  name={`rating_${items.name}`}
                  render={({ field }) => (
                    <input
                      title="rating"
                      type="number"
                      min="10"
                      max="100"
                      step="10"
                      className="w-[90px] min-h-[50px] rounded-lg pr-2 bg-red-500 text-center border border-black text-white placeholder:text-white"
                      placeholder="0"
                      {...field}
                    />
                  )}
                />
              )}
            </div>
          </div>
        ))}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-5 p-2 rounded"
          >
            Save My Responses
          </button>
        </div>
      </form>
    </div>
  );
};

export default GridForm;
