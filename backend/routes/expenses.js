const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middlewares/auth');

// Get all expenses
router.get('/get', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id, deleted: false }).lean().sort({ createdAt: -1 });;
    const formattedExpenses = expenses.map(expense => ({
      ...expense,
      date: expense.date.toISOString().split('T')[0]
    }));
    res.json(formattedExpenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new expense
router.post('/add', auth, async (req, res) => {
  const { type, title, description, date, amount, tags } = req.body;

  try {
    const newExpense = new Expense({
      user: req.user.id,
      type,
      title,
      description,
      date,
      amount,
      tags
    });

    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update expense
router.put('/update/:id', auth, async (req, res) => {
  const { type, title, description, date, amount, tags } = req.body;

  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: { type, title, description, date, amount, tags } },
      { new: true }
    );

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete expense
// Soft delete expense
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Soft delete the expense
    expense.deleted = true;
    await expense.save();

    res.json({ msg: 'Expense soft deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/toggle-active/:id', auth, async (req, res) => {
  try {
    const { isActive } = req.body;
    let expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    expense.deleted = !isActive;
    await expense.save();

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get monthly expense summary
router.get('/monthly-summary', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id, deleted: false });
    const monthlySummary = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += expense.amount;
      return acc;
    }, {});
    res.json(monthlySummary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;