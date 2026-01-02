import { Router } from "express";
import { upsertProfile } from "../controllers/profile.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/", requireAuth, upsertProfile);

export default router;
