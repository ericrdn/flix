import mongoose from "mongoose";
import Video from "./Video";

const SerieSchema = new mongoose.Schema({
  name: String
  //eps: [Video]
});

export default mongoose.model("Serie", SerieSchema);
