import Image from "next/image";

type Ctype = {
  _id: string;
  type: string;
};

const CarCard = ({ carOutput }: any) => {
  return (
    <div className="flex flex-wrap">
      {carOutput.map((car: Ctype) => (
        <Image
          key={car._id}
          src={`/images/cars/${car.type}.jpeg`}
          width={250}
          height={250}
          alt="Car card"
          className="border-2 border-neutral-500 p-2 m-2 w-72 rounded-xl shadow-lg shadow-cyan-500/50 max-h-44"
        />
      ))}
    </div>
  );
};
export default CarCard;
