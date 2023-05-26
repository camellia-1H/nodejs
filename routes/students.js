import express from "express";
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

router.post("/", (req, res) => {
  res.send("insert student");
});

export default router;
