import express from "express";

import {
  addTransaction,
  getTransactions,
} from "../controllers/transactionController.js";

import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

// Add transaction
router.post("/", protect, addTransaction);

// Get transactions
router.get("/", protect, getTransactions);

export default router;