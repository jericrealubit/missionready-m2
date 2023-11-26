//"use client";

import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    name: "Bishal Shrestha",
    age: "27",
  };

  return NextResponse.json({ data });
}

require("dotenv").config();

import Link from "next/link";
//import { useEffect } from "react";

const url = process.env.PURL;

const options = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "Prediction-Key": process.env.PKEY,
  },
  data: {
    url: "https://www.volvocars.com/images/v/-/media/market-assets/australia/applications/localpages/images/model-lineup/my24-xc40-recharge-single.png?iar=0&w=1080",
  },
  url,
};

export default function Home() {
  // useEffect(() => {
  //   console.log({
  //     url: process.env.PURL,
  //     key: process.env.PKEY,
  //   });
  //   // fetch("/api/route-name", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify(objectWithData),
  //   // });
  // });

  return (
    <main>
      <h1>{process.env.PURL}</h1>

      <h2>Dashboard</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
        repellendus tempore, exercitationem odit, quasi doloremque possimus
        recusandae alias sequi totam soluta natus iure eius, obcaecati sint
        dolores blanditiis aspernatur quo officia iusto ut. Et, aliquid sed
        voluptates iste cum totam, facere explicabo, fugit suscipit ratione
        aspernatur consequuntur ex mollitia quaerat?
      </p>

      <div className="flex justify-center my-8">
        <Link href="/tickets">
          <button className="btn-primary">View Tickets</button>
        </Link>
      </div>

      <h2>Company Updates</h2>

      <div className="card">
        <h3>New member of the web dev team...</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at
          quam. Dolores omnis possimus quam soluta rerum illo laborum ullam
          pariatur molestiae, modi beatae corrupti.
        </p>
      </div>
      <div className="card">
        <h3>New website live!</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at
          quam. Dolores omnis possimus quam soluta rerum illo laborum ullam
          pariatur molestiae, modi beatae corrupti, assumenda distinctio
          adipisci, cupiditate minima eum vitae? Similique dicta est facilis
          debitis, autem temporibus quo repellat illum unde id iste veritatis
          eveniet, aspernatur enim quas.
        </p>
      </div>
    </main>
  );
}
