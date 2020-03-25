import fs from "fs";
import Video from "../models/Video";
import mongoose from "mongoose";

export default {
  get: async (req, res) => {
    const Videos = await Video.find();
    return res.json(Videos);
  },
  delete: async (req, res) => {
    try {
      const { video_id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(video_id)) res.status(500).send();
      await Video.findByIdAndRemove(video_id);
      return res.json({ Status: "OK" });
    } catch (err) {
      throw err;
    }
  },
  post: async (req, res) => {
    try {
      Video.create(req.body);
      return res.json({ Status: "OK" });
    } catch (err) {
      throw err;
    }
  },
  video: async (req, res) => {
    try {
      const { video_id } = req.params;

      

      if (!mongoose.Types.ObjectId.isValid(video_id)) res.status(500).send();

      const VideoPlayer = await Video.findById(req.params.video_id).catch(
        error => {
          throw error;
        }
      );

      //console.log(VideoPlayer);

      if (!VideoPlayer) res.status(400).send();

      if (VideoPlayer) {
        //console.log("Abrindo video " + VideoPlayer.path);

        const path = VideoPlayer.path;
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
        
          console.log(new Date(), req.headers['user-agent'], "Stream video " + range, VideoPlayer.title);
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

          if (start >= fileSize) {
            res
              .status(416)
              .send(
                "Requested range not satisfiable\n" + start + " >= " + fileSize
              );
            return;
          }

          const chunksize = end - start + 1;
          const file = fs.createReadStream(path, { start, end });
          const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
          };

          res.writeHead(206, head);
          file.pipe(res);
        } else {
          console.log(new Date(), req.headers['user-agent'], "Download video " + video_id, VideoPlayer.title);
          const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4"
          };
          res.writeHead(200, head);
          fs.createReadStream(path).pipe(res);
        }
      }
    } catch (err) {
      throw err;
    }
  }
};
