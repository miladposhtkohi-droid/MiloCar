import mongoose from "mongoose";

const carSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
})

export default mongoose.model("Car", carSchema);