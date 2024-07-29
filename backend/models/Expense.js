const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  tags: [{ key: String, value: String }],
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
