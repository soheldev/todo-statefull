const mongoose = require('mongoose');

const TypeMasterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model('TypeMaster', TypeMasterSchema);