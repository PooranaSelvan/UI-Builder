import express from "express";
import { getPages, savePage, getCustomComponents, saveCustomComponent, getProjects, saveProject } from "../controllers/builderController.js";

const router = express.Router();


router.route("/components").get(getCustomComponents).post(saveCustomComponent);
router.route("/pages").get(getPages).post(savePage);
router.route("/projects").get(getProjects).post(saveProject);


export default router;
