"use client";

import { Envs } from "@/utils/config";
import { useState, useEffect } from "react";
import Image from "next/image";
import Info from "./components/Info";
import CarCard from "./components/CarCard";

const isValidHttpUrl = (urlInput: string) => {
  let url;

  try {
    url = new URL(urlInput);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

const Home = () => {
  const [carUrl, setCarUrl] = useState("/images/noimage.jpeg");
  const [carTypes, setCarTypes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [carInput, setCarInput] = useState("");
  const [carOutput, setCarOutput] = useState<string[]>([]);
  const [validUrl, setValidUrl] = useState(true);

  useEffect(() => {
    const baseUrl =
      window.location.hostname === "localhost" ? "http://localhost:3000" : "";
    fetch(baseUrl + "/api/cartypes/v1")
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

    if (validUrl) {
      setLoading(true);
      const pkey = Envs.PREDICTION_KEY;
      const purl = Envs.PREDICTION_URL;

      const submitData = JSON.stringify({ url: carUrl });
      const headers = {
        "content-type": "application/json",
        "Prediction-Key": pkey || "",
      };

      const res = await fetch(purl || "", {
        method: "POST",
        body: submitData,
        headers: headers,
      })
        .then((response) => {
          if (response.status >= 400 && response.status < 600) {
            //console.log(response);
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
        setValidUrl(true);
      }
    } else {
      const carAvailableTypes = ["sedan", "suv", "ute", "van"];
      if (carAvailableTypes.includes(carUrl)) {
        setCarOutput([]);
        const searchResult = getMatchType(carTypes, carUrl);
        console.log({ searchResult });
        console.log({ carOutput });
      } else {
        setValidUrl(false);
      }
    }
  };

  return (
    <main>
      <div className="max-w-5xl flex flex-wrap justify-center items-center w-full ">
        <Info />
        <form
          className=" flex justify-center items-center "
          onSubmit={handleSubmit}
        >
          <div className=" flex justify-center items-center gap-4 ">
            <div>
              <input
                type="text"
                name="url"
                placeholder="Enter car image url or one of [sedan, suv, ute, van]"
                onBlur={(e) => setCarUrl(e.target.value)}
                className=" border p-2 px-4 rounded outline-none "
                onKeyUp={(e) => {
                  isValidHttpUrl((e.target as HTMLInputElement).value)
                    ? setValidUrl(true)
                    : setValidUrl(false);
                }}
              />
            </div>
            <button
              type="submit"
              className="row-span-2 border-blue-500 bg-blue-500 text-white p-2 px-4 rounded-md "
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
            className="max-h-32"
          />
        </div>
      </div>
      <div>
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
          {!validUrl && <div className="error">Please enter a valid url.</div>}
          {carInput === "Negative" && (
            <div className="error">This is not a car image</div>
          )}
          {carInput !== "Negative" && <CarCard carOutput={carOutput} />}
        </div>
      </div>
    </main>
  );
};

export default Home;
