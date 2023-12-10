"use client";

import { Envs } from "@/utils/config";
import { useState, useEffect } from "react";
import Image from "next/image";

const isValidHttpUrl = (urlInput: string) => {
  let url;

  try {
    url = new URL(urlInput);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

const FindSimilarCar = () => {
  const [carUrl, setCarUrl] = useState("/images/noimage.jpeg");
  const [carTypes, setCarTypes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [carInput, setCarInput] = useState("");
  const [carOutput, setCarOutput] = useState<string[]>([]);
  const [visionError, setVisionError] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(false);

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
    setCarOutput(result);
    return result;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setCarOutput([]);
    setCarInput("");

    if (isValidUrl) {
      setLoading(true);
      const pkey = Envs.PREDICTION_KEY;
      const purl = Envs.PREDICTION_URL;
      const submitData = { url: carUrl };

      const res = await fetch(purl || "", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
          "Prediction-Key": pkey || "",
        },
      })
        .then((response) => {
          if (response.status >= 400 && response.status < 600) {
            console.log(response);
            throw new Error(`Request failed with status ${response.status}`);
          } else {
            return response;
          }
        })
        .catch((error) => {
          // Your error is here!
          console.log(error);
        });

      if (!res?.ok) {
        throw new Error(`Request failed with status ${res?.status}`);
      } else {
        const data = await res.json();
        console.log({ data });
        const tag = data.predictions[0].tagName;
        setCarInput(tag);
        const searchResult = getMatchType(carTypes, tag);
        console.log({ searchResult });
        setLoading(false);
      }
    } else {
      setIsValidUrl(false);
    }
  };

  return (
    <main>
      <div className="max-w-5xl flex flex-wrap justify-center items-center w-full ">
        <form
          className=" flex justify-center items-center "
          onSubmit={handleSubmit}
        >
          <div className=" flex justify-center items-center gap-4 ">
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
              onKeyUp={(e) => {
                isValidHttpUrl((e.target as HTMLInputElement).value)
                  ? setIsValidUrl(true)
                  : setIsValidUrl(false);
              }}
            />
            <button
              type="submit"
              className=" border-blue-500 bg-blue-500 text-white p-2 px-4 rounded-md "
            >
              Submit
            </button>
            <div className="w-24">
              {isLoading && <div>...</div>}
              {carInput}
            </div>
          </div>
        </form>
        <div className="flex flex-col">
          <img
            src={carUrl}
            alt="car image"
            width={200}
            height={200}
            className="max-h-40"
          />
        </div>
      </div>
      <div>
        {visionError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{visionError}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
        {isLoading && (
          <Image
            className="mx-auto"
            src="/images/hero-moving-car.gif"
            width={200}
            height={200}
            alt="loading image"
          />
        )}

        <div>
          {!isValidUrl && carUrl.length > 0 && (
            <div className="error">Please enter a valid url.</div>
          )}
          {carInput === "Negative" && (
            <div className="error">This is not a car image</div>
          )}
        </div>

        <div className="flex flex-wrap">
          {carOutput.map((car) => (
            <Image
              key={car.id}
              src={`/images/cars/${car.type}.jpeg`}
              width={300}
              height={300}
              alt="Car card"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FindSimilarCar;
