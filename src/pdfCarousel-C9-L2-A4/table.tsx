import Image from "next/image";
import React from "react";

const Data = [
  {
    img: "/images/PLAYGROUND.jpg",
    firstCol: "School Playground equipment is broken.",
    secCol: [
      {
        
        a: "Mark the broken equipment",
        b: "Mark the broken equipment",
        c: "Urge the school authorities to get it fixed.",
        d: ""
      },
    ],
    thirdCol: "Write a letter to the principal and urge for this to be fixed.",
  },
  {
    img: "/images/LIBRARY.jpg",
    firstCol: "The library needs new books.",
    secCol: [
      {
        a: "Conduct a book donation drive and get students to bring books from their home and donate to school.",
        b: "Organise a fund raiser event [selling cookies/lemonade, game kiosks, garage sale",
        c: "",
        d: "",
      },
    ],
    thirdCol: "organize a fundraiser, to generate funds to order more books",
  },

  {
    img: "/images/hamburger.jpg",
    firstCol: "The cafeteria food is not healthy.",
    secCol: [
      {
        a: "Report on the menu and food group components",
        b: "Awareness of healthy food",
        c: "Conduct a signature campaign",
        d: "",
      },
    ],
    thirdCol: "Create a student committee to  decide the menu.",
  },
];
const Table = () => {
  return (
    <div className="min-h-screen bg-white text-black flex  flex-col justify-center items-center p-5">
      <div className="grid grid-cols-12 w-full place-items-center text-center border border-black ">
        <div className="col-span-6  w-full bg-blue-400">
          <h4 className="text-3xl">Situation</h4>
        </div>
        <div className="col-span-3  w-full bg-blue-400">  <h4 className="text-3xl">Alternative Solutions</h4></div>
        <div className="col-span-3  w-full bg-blue-400" > <h4 className="text-3xl">Plan of Action</h4></div>
      </div>
      {Data.map((item, index) => (

        <div key={index} className="grid grid-cols-12 place-items-center p-5 border">
          <div className="col-span-3">
            <Image className="  rounded-lg" src={item.img} width={200} height={200} alt="" />
          </div>
          <div className="col-span-3 text-lg p-2">{item.firstCol}</div>
          <div className="col-span-3">
            {item.secCol.map((i, inx) => (
              <ul key={inx} className="text-lg p-2 ">
                <li>{i.a}</li>
                <li>{i.b}</li>
                <li>{i.c}</li>
                <li>{i.d}</li>
              </ul>
            ))}
          </div>
          <div className="col-span-3 text-lg p-2">{item.thirdCol}</div>
        </div>
      ))}
    </div>
  );
};

export default Table;
