import { Router } from "express";
import VideoController from "./controllers/VideoController";
import SerieController from "./controllers/SerieController";

const routes = Router();

routes.get("/video/stream/:video_id", VideoController.video);
routes.get("/video", VideoController.get);
routes.delete("/video/:video_id", VideoController.delete);
routes.post("/video", VideoController.post);

//routes.post("/video", VideoController.post);
//routes.get("/video", VideoController.get);
//routes.delete("/video/:video_id", VideoController.delete);

export default routes;
