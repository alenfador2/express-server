const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

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
      required: [true, 'Email is required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
    verificationToken: {
      type: String,
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

userSchema.methods.setPassword = async function (password) {
  const hash = bcrypt.hashSync(password, 12);
  this.password = hash;
};

userSchema.methods.checkPassword = async function () {
  await bcrypt.compare(password, this.password);
};

const Users = mongoose.model('Users', userSchema, 'users');
module.exports = Users;
