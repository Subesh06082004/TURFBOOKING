import express from "express";
import { createTurf, getTurfById , getAllTurfLocations , updateTurf , deleteTurf } from "../controllers/turfController.js";
import multer from "multer";
import Auth from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

router.get("/location", getAllTurfLocations)
router.post("/register", upload.array('turfImages', 5), createTurf);
router.get("/:id",  getTurfById);
router.put("/update/:turfId" , updateTurf )
router.delete("/delete/:turfId", deleteTurf)

export default router;
