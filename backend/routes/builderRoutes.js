import express from "express";


const router = express.Router();


router.route("/page").post().get();
router.route("/component").post().get();