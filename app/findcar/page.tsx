"use client";

import { Envs } from "@/utils/config";
import { useState, useEffect } from "react";
import Image from "next/image";

const Findcar = () => {
  const [carUrl, setCarUrl] = useState("/images/noimage.jpeg");
  const [carTypes, setCarTypes] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isThingking, setThingking] = useState(false);
  const [carInput, setCarInput] = useState("");
  const [carOutput, setCarOutput] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/data")
      .then((res) => res.json())
      .then((data) => {
        setCarTypes(data);
        setLoading(false);
      });
  }, []);

  const getMatchType = (haystack: string[], niddle: string) => {
    let result: string[] = [];
    for (let i = 0; i < haystack.length; i++) {
      if (JSON.stringify(haystack[i]).includes(niddle)) {
        result.push(haystack[i]);
      }
    }
    return result;
  };

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

      //console.log(carTypes);

      const searchResut: string[] = getMatchType(carTypes, tag);
      console.log(searchResut);
      await setCarOutput(searchResut);
      console.log(carOutput);
      console.log(carOutput.length);

      if (res.ok) {
        console.log("Yeai!");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  interface Loader {
    src: string;
    width: number;
    quality: number;
  }

  return (
    <main>
      <div className=" flex flex-col justify-center items-center w-full p-8 ">
        <Image
          loader={(l: Loader) => `${l.src}?w=${l.width}&q=${l.quality || 75}`}
          src={carUrl}
          alt="car image"
          width={200}
          height={200}
          priority={false}
        />
        <h1 className=" w-full text-center m-4 font-semibold text-lg ">
          Find similar car type
        </h1>
        <form
          className=" flex w-full flex-col justify-center items-center "
          onSubmit={handleSubmit}
        >
          <div className=" flex w-full justify-center items-center gap-4 ">
            <input
              type="text"
              name="url"
              placeholder="Enter car image url"
              onBlur={(e) =>
                e.target.value.length > 0
                  ? setCarUrl(e.target.value)
                  : undefined
              }
              className=" border p-2 px-4 rounded outline-none "
            />
            <button
              type="submit"
              className=" border-blue-500 bg-blue-500 text-white p-2 px-4 rounded-md "
            >
              Submit
            </button>
            <div className="w-24">
              {isThingking && <div>...</div>}
              {carInput}
            </div>
          </div>
        </form>
      </div>
      <div>
        x{isLoading && <p>Loading...</p>}
        {!carOutput && <p>No profile data</p>}
        {carInput}
        {carOutput.length > 0 &&
          carOutput.map((car: { id: String; type: String }) => {
            <div key={Number(car.id)}>{car.type}</div>;
          })}
        x
      </div>
    </main>
  );
};

export default Findcar;
