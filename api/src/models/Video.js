import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  name: String,
  path: String,
  title: String,
  img: String
});

export default mongoose.model("Video", VideoSchema);
