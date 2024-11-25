const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    virtuals: {
      fullName: {
        get() {
          return this.firstName + ' ' + this.lastName;
        },
        set(n) {
          this.firstName = n.substr(0, n.indexOf(' '));
          this.lastName = n.substr(n.indexOf(' ') + 1);
        },
      },
    },
  }
);

const Users = mongoose.model('Users', userSchema, 'users');
module.exports = Users;
