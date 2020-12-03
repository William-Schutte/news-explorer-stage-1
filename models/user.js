const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Invalid Email',
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

// This static method is defined directly on the model and can be used just like
// User.find() or User.update(). In fact, we could just use User.find() if it weren't
// for password encryption, which is handled automatically below.
// See: https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html

userSchema.statics.userLogin = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new Error('Incorrect email/password'));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Incorrect email/password'));
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
