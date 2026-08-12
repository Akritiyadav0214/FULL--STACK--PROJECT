import Transaction from "../models/Transaction.js";
import BankAccount from "../models/BankAccount.js";

// ================= ADD TRANSACTION =================

export const addTransaction = async (req, res) => {
  try {
    const {
      bankAccount,
      type,
      amount,
      category,
      description,
      date,
    } = req.body;

    // Check required fields
    if (
      !bankAccount ||
      !type ||
      !amount ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Bank account, type, amount and category are required",
      });
    }

    // Find the bank account belonging to the logged-in user
    const account = await BankAccount.findOne({
      _id: bankAccount,
      user: req.user._id,
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Bank account not found",
      });
    }

    // Create transaction
    const transaction = await Transaction.create({
      user: req.user._id,
      bankAccount,
      type,
      amount,
      category,
      description,
      date,
    });

    // Update bank balance
    if (type === "income") {
      account.balance += Number(amount);
    }

    if (type === "expense") {
      account.balance -= Number(amount);
    }

    await account.save();

    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      transaction,
      balance: account.balance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET TRANSACTIONS =================

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    })
      .populate(
        "bankAccount",
        "bankName accountName"
      )
      .sort({
        date: -1,
      });

    res.status(200).json({
      success: true,
      transactions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};