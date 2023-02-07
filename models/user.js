const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltWorkFactor = parseInt(process.env.SALT_WORK_FACTOR) || 10;

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection: "users" }
);

userSchema.pre("save", async function save(next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(saltWorkFactor);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
