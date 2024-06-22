import mongoose from "mongoose";

const countriesSchema = new mongoose.Schema();

const Countries = mongoose.model("Countries", countriesSchema);
export default Countries;
