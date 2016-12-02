var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String
});

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
});

var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function(attemptedPassword, cb) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, isMatch);  
    }
  });
};

module.exports = User;
