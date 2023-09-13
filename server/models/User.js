const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username is already in use'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Username is already in use'],
      match: [/.+@.+\..+/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [4, 'Password must be at least 4 characters long'],
      maxlength: 200,
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Define custom error messages here
userSchema.messages = {
  'Username is required': 'Custom message for required username',
  'Email is required': 'Custom message for required email',
  'Invalid email format': 'Custom message for invalid email format',
  'Password is required': 'Custom message for required password',
  'Password must be at least 4 characters long':
    'Custom message for minimum password length',
  // Add more custom messages for other validations as needed
};

const User = model('User', userSchema);

module.exports = User;
