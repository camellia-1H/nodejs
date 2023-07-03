import express from "express";
import studentController from "../controllers/studentController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET all students");
});

router.post("/:id", (req, res) => {
  res.send("Get detail student by id : " + req?.params?.id ?? "");
});

// patch : khong có sẽ tạo mới
//
router.patch("/", (req, res) => {
  res.send("create new obj if not exist when update student");
});

router.post("/", studentController.insertStudent);

export default router;
