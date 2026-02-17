import express from "express";
import { getPages, savePage, getCustomComponents, saveCustomComponent, getProjects, saveProject, updatePage, getPageByPageId,deleteCustomComponent} from "../controllers/builderController.js";

const router = express.Router();

// Custom Components
router.get("/components/user/:userId", getCustomComponents);
router.post("/components", saveCustomComponent);
router.delete("/components/:componentId", deleteCustomComponent);




// Page
router.route("/pages/:userId").get(getPages);
router.route("/pages").post(savePage);
router.route("/pages/:pageId").put(updatePage);
router.route("/page/:pageId").get(getPageByPageId);

// Project
router.route("/projects/:userId").get(getProjects);
router.route("/projects").post(saveProject);


export default router;
