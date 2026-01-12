const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  work: { type: String, enum: ['chef','waiter','manager'], required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: String,
  salary: { type: Number, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// pre-save middleware: hash password
personSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// instance method to compare password
personSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Person', personSchema);
