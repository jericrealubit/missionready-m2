import mongoose from "mongoose";
import { Envs } from "@/utils/config";

const connect = async () => {
  try {
    await mongoose.connect(Envs.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connection successful");
  } catch (err) {
    throw new Error(`Error connecting to Mongodb: ${err.message}`);
  }
};

export default connect;
