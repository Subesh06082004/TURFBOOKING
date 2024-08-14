import mongoose from "mongoose";

const turfSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a name "],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a name "],
  },
  password: {
    type: String,
    required: [true, "Please provide a password "],
  },
  email: {
    type: String,
    required: [true, "Please provide a email "],
    unique: true,
  },
  phoneno: {
    type: String,
    required: [true, "Please provide a phone no  "],
    
  },
  turfName: {
    type: String,
    required: [true, "Please provide a phone no  "],
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  openTime: {
    type: Date,
    required: true,
  },
  closeTime: {
    type: Date,
    required: true,
  },
  imageUrl: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  isManager : {
    type : Boolean,
    default : true
  }
});

const Turf = mongoose.model("Turf", turfSchema);
export default Turf;
