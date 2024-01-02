import mongoose from "mongoose";

const { Schema } = mongoose;

const carTypesSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
});

//If the CarTypes collection does not exist create a new one.
export default mongoose.models.cartypes ||
  mongoose.model("cartypes", carTypesSchema);
