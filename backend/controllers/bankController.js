import BankAccount from "../models/BankAccount.js";

// Add Bank Account
export const addBankAccount = async (req, res) => {
  try {
    const { bankName, accountName, accountType, balance } = req.body;

    const account = await BankAccount.create({
      user: req.user._id,
      bankName,
      accountName,
      accountType,
      balance,
    });

    res.status(201).json({
      success: true,
      account,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Accounts
export const getAccounts = async (req, res) => {
  try {
    const accounts = await BankAccount.find({
      user: req.user._id,
    });

    res.json({
      success: true,
      accounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Bank Account
export const updateBankAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await BankAccount.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Bank account not found",
      });
    }

    const {
      bankName,
      accountName,
      accountType,
      balance,
    } = req.body;

    account.bankName = bankName;
    account.accountName = accountName;
    account.accountType = accountType;
    account.balance = balance;

    await account.save();

    res.status(200).json({
      success: true,
      message: "Bank account updated successfully",
      account,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Bank Account
export const deleteBankAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await BankAccount.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Bank account not found",
      });
    }

    await account.deleteOne();

    res.status(200).json({
      success: true,
      message: "Bank account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};