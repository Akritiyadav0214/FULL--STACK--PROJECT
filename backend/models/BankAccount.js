import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bankName: {
      type: String,
      required: true,
    },

    accountName: {
      type: String,
      required: true,
    },

    accountType: {
      type: String,
      enum: ["Savings", "Current", "Credit Card", "Cash", "Wallet"],
      default: "Savings",
    },

    balance: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "USD",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BankAccount", bankAccountSchema);