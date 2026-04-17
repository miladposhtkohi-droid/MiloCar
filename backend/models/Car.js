import mongoose from 'mongoose';

const carSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    location: { type: String, required: true },
    fuelType: {
      type: String,
      enum: ["bensin", "diesel", "el", "hybrid"],
      required: true,
    },
    gearbox: { type: String, enum: ["manuell", "automat"], required: true },
    description: { type: String },
    sellerType: {
      type: String,
      enum: ["private", "dealer"],
      default: "private",
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // koppling till användare
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Car", carSchema);
