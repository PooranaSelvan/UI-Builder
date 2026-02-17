import express from "express";
import { getPages, savePage, getCustomComponents, saveCustomComponent, getProjects, saveProject, updatePage, getPageByPageId, deleteProject, deletePage, deleteCustomComponent, deleteAllCustomComponent } from "../controllers/builderController.js";

const router = express.Router();

// Custom Components
router.route("/components/:userId").get(getCustomComponents);
router.route("/components").post(saveCustomComponent);
router.route("/components").delete(deleteAllCustomComponent);
router.route("/components/:componentId").delete(deleteCustomComponent);

// Page
router.route("/pages/:userId").get(getPages);
router.route("/pages").post(savePage);
router.route("/pages/:pageId").put(updatePage);
router.route("/page/:pageId").get(getPageByPageId);
router.route("/pages").delete(deletePage);

// Project
router.route("/projects/:userId").get(getProjects);
router.route("/projects").post(saveProject);
router.route("/projects").delete(deleteProject);


export default router;