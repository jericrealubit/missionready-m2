"use client";

import { Envs } from "@/utils/config";
import { useState, useEffect } from "react";
import Image from "next/image";
// import fs from "fs";
//const fs = require("fs");
// const fs = require("fs");
//var fs = require("fs");

// export const getStaticProps = async () => {
//   let filenames: String[] = [];
//   const fileNames = fs.readdirSync("./public/images/cars");
//   fileNames.forEach((file) => {
//     filenames = [...filenames, ...[file]];
//   });
//   console.log(filenames);

//   return {
//     props: { cars: filenames },
//   };
// };

// export const getCars = () => {
//   const fileNames = fs.readdirSync("./public/images/cars");
//   return fileNames;
// };

const Findcar = () => {
  const [carUrl, setCarUrl] = useState("");
  //const [carNames, setCarNames] = useState("");

  // useEffect(() => {
  //   const fileNames = fs.readdirSync("./public/images/cars");
  //   setCarNames(fileNames);
  //   console.log(fileNames);
  // }, [carNames]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //console.log(props);

    const pkey = Envs.PREDICTION_KEY;
    const purl = Envs.PREDICTION_URL;
    const submitData = { url: carUrl };

    try {
      const res = await fetch(purl || "", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
          "Prediction-Key": pkey || "",
        },
      });
      const data = await res.json();
      const tag = data.predictions[0].tagName;
      console.log(tag);

      if (res.ok) {
        console.log("Yeai!");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }

    setCarUrl("");
  };

  return (
    <main>
      <div className=" flex flex-col justify-center items-center w-full p-8 ">
        <Image
          src="/images/cars/hatch1.jpeg"
          alt="car image"
          width={200}
          height={200}
        />
        <h1 className=" w-full text-center m-4 font-semibold text-lg ">
          Find similar car type
        </h1>
        <form
          className=" flex w-full flex-col justify-center items-center "
          onSubmit={handleSubmit}
        >
          <div className=" flex w-1/2 justify-center items-center gap-4 ">
            <input
              type="text"
              name="url"
              placeholder="Enter car image url"
              onChange={(e) => setCarUrl(e.target.value)}
              className=" border p-2 px-4 rounded outline-none "
            />
            <button
              type="submit"
              className=" border-blue-500 bg-blue-500 text-white p-2 px-4 rounded-md "
            >
              Submit
            </button>

            <div>
              <h2>Example of getStaticProps in Next JS 13</h2>
              {/* {carNames.map((car: String, index: number) => (
                <li key={index}>{car}</li>
              ))} */}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Findcar;
