import express from "express";

import {
  addBankAccount,
  getAccounts,
  updateBankAccount,
  deleteBankAccount,
} from "../controllers/bankController.js";

import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();


// Add account
router.post("/", protect, addBankAccount);


// Get accounts
router.get("/", protect, getAccounts);


// Update account
router.put("/:id", protect, updateBankAccount);


// Delete account
router.delete("/:id", protect, deleteBankAccount);


export default router;