import { Router } from "express";
import UserManager from "../db/user-manager.js";
import SubsManager from "../db/subs-manager.js";

const router = Router();
const userManager = new UserManager();
const subsManager = new SubsManager();

const isLogged = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const { payload } = await subsManager.createSubList();
    user.subsList = payload._id;
    const response = await userManager.registerUser(user);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

router.get("/getUser", async (req, res) => {
  try {
    const cookie = req.headers.authorization;
    if (!cookie) return res.status(401).json({ message: req.headers });
    const user = await userManager.getUser(cookie);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

router.get("/", isLogged, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = await userManager.getUser(token);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

router.post("/loginUser", async (req, res) => {
  try {
    const user = req.body;
    const response = await userManager.loginUser(user);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

router.put("/", isLogged, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const newData = req.body;
    const response = await userManager.updateUser(token, newData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

export default router;
