import fs from "fs";
import Serie from "../models/Serie";
import mongoose from "mongoose";

export default {
  get: async (req, res) => {
    const Videos = await Serie.find();
    return res.json(Videos);
  },
  delete: async (req, res) => {
    try {
      const { video_id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(video_id)) res.status(500).send();
      await Serie.findByIdAndRemove(video_id);
      return res.json({ Status: "OK" });
    } catch (err) {
      throw err;
    }
  },
  post: async (req, res) => {
    try {
      Serie.create(req.body);
      return res.json({ Status: "OK" });
    } catch (err) {
      throw err;
    }
  }
};
