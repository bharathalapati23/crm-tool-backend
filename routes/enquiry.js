import express from "express";
import {
  createEnquiry,
  getEnquiries,
  getSingleEnquiry,
  addComment,
} from "../controllers/enquiry.js";

const router = express.Router();

router.post("/", createEnquiry);
router.get("/", getEnquiries);
router.post("/addComment", addComment);
router.get("/getSingleEnquiry", getSingleEnquiry);

export default router;
