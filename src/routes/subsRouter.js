import { Router } from "express";
import SubsManager from "../db/subs-manager.js";

const router = Router();
const subsManager = new SubsManager();

router.post("/:id", async (req, res) => {
  try {
    const response = await subsManager.addSub(req.params.id, req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id/:idSub", async (req, res) => {
  try {
    const response = await subsManager.updateSub(
      req.params.id,
      req.params.idSub,
      req.body
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id/:idSub", async (req, res) => {
  try {
    const response = await subsManager.deleteSub(
      req.params.id,
      req.params.idSub
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await subsManager.updateSubListIsPaid(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
