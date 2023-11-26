"use client";

import { Envs } from "@/utils/config";

import { useState, useEffect } from "react";

const Findcar = () => {
  const [carUrl, setSetCarUrl] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(Envs.PREDICTION_KEY);
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
      console.log(res);
      if (res.ok) {
        console.log("Yeai!");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const res = await fetch("http://localhost:3000/api/handleform", {
    //     method: "POST",
    //     body: JSON.stringify(submitData),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   });
    //   console.log(res);
    //   if (res.ok) {
    //     console.log("Yeai!");
    //   } else {
    //     console.log("Oops! Something is wrong.");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    setSetCarUrl("");
  };

  return (
    <main>
      <div className=" flex flex-col justify-center items-center w-full p-8 ">
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
              onChange={(e) => setSetCarUrl(e.target.value)}
              className=" border p-2 px-4 rounded outline-none "
            />
            <button
              type="submit"
              className=" border-blue-500 bg-blue-500 text-white p-2 px-4 rounded-md "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Findcar;
