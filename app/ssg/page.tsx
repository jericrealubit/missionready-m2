import fs from "fs";

const page = async () => {
  const carnames: String[] = fs.readdirSync("./public/images/cars");
  return (
    <main>
      <h2>Example of getStaticProps in Next JS 13</h2>
      <ul>
        {carnames.map((car: String, index: number) => {
          let temp: string = "";
          if (car.includes("ute")) {
            temp = `<li key=${index}>${car}</li>`;
          }
          return temp;
        })}
      </ul>
    </main>
  );
};

// export const getCars = async () => {
//   let filenames: String[] = [];
//   const fileNames = fs.readdirSync("./public/images/cars");
//   fileNames.forEach((file) => {
//     filenames = [...filenames, ...[file]];
//   });

//   return filenames;
// };

export default page;
