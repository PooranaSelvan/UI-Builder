import express from "express";
import { getPages, savePage, getCustomComponents, saveCustomComponent } from "../controllers/builderController.js";

const router = express.Router();


router.route("/components").get(getCustomComponents).post(saveCustomComponent);
router.route("/pages").get(getPages).post(savePage);


export default router;
