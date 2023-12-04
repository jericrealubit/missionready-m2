"use client";

import { Envs } from "@/utils/config";
import { useState, useEffect } from "react";
import Image from "next/image";

const Findcar = () => {
  const [carUrl, setCarUrl] = useState("/images/noimage.jpeg");
  const [carTypes, setCarTypes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isThingking, setThingking] = useState(false);
  const [carInput, setCarInput] = useState("");
  const [carOutput, setCarOutput] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/data")
      .then((res) => res.json())
      .then((data) => {
        setCarTypes(data);
      });
  }, []);

  const getMatchType = (haystack: string[], niddle: string) => {
    let result: string[] = [];
    for (let i = 0; i < haystack.length; i++) {
      if (JSON.stringify(haystack[i]).includes(niddle)) {
        result.push(haystack[i]);
      }
    }
    console.log({ haystack });
    console.log({ niddle });
    console.log({ result });
    setCarOutput(result);
    console.log({ carOutput });
    return result;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setThingking(true);
    setCarInput("");
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

      const searchResult = getMatchType(carTypes, tag);
      console.log({ searchResult });
      setCarOutput(searchResult);
      //setCarOutput(result);
      console.log({ carOutput });
      console.log(typeof carOutput);
      const carOutputR = Object.entries(carOutput);
      console.log({ carOutputR });
      console.log(typeof carOutputR);
      setLoading(false);

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
          loader={(l: Loader): string =>
            `${l.src}?w=${l.width}&q=${l.quality || 75}`
          }
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
        {isLoading && <p>Loading...</p>}
        <div className="flex flex-col">
          {carOutput.map((car) => (
            <Image
              key={car.id}
              src={`/images/cars/${car.type}.jpeg`}
              width={300}
              height={300}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Findcar;
