const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    required: true,
  },
  resetTokenExpiry: {
    type: Date,
    required: true,
  },
});

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

module.exports = PasswordReset;
