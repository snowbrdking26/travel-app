// ===========================
//USERS Schema
// ===========================

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

// model document middleware
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        const hashedPassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        this.password = hashedPassword;
    }
    next();
});

// custom instance method
userSchema.methods.authenticate = function (password) {
    // compare password to the bcrypt one
    return bcrypt.compareSync(password, this.password); // true or false
}

module.exports = mongoose.model('User', userSchema);