"use client";

import { Envs } from "@/utils/config";
import { useState, useEffect } from "react";
import Image from "next/image";

const Findcar = () => {
  const [carUrl, setCarUrl] = useState(
    "data:image/png;base64,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"
  );
  const [carTypes, setCarTypes] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isThingking, setThingking] = useState(false);
  const [carInput, setCarInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/data")
      .then((res) => res.json())
      .then((data) => {
        setCarTypes(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setThingking(true);
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
      setCarInput(tag);
      setThingking(false);

      const searchResut: string[] = getMatchType(carTypes, carInput);
      console.log(searchResut);

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

  const getMatchType = (haystack: string, niddle: string) => {
    let result: string[] = [];
    for (let i = 0; i < haystack.length; i++) {
      if (haystack[i].includes(niddle)) {
        result.push(haystack[i]);
      }
    }
    return result;
  };

  return (
    <main>
      <div className=" flex flex-col justify-center items-center w-full p-8 ">
        <Image src={carUrl} alt="car image" width={200} height={200} />
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
              {isThingking && <p>Analizing image...</p>}
              {carInput}
            </div>
          </div>
        </form>
      </div>
      <div>
        x{isLoading && <p>Loading...</p>}
        {!carTypes && <p>No profile data</p>}
        {carInput}
        {carTypes.length > 0 &&
          carTypes.map((car: { id: String; type: String }) => {
            <div key={Number(car.id)}>{car.type}</div>;
          })}
        x
      </div>
    </main>
  );
};

export default Findcar;
