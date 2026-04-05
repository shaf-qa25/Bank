const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
        unique: [true, "email already exists"]
    },
    name: {
        type: String,
        required: [true, "Name is required for creating account"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [8, "Password should contain at least 6 characters"],
        select: false
    }

}, {
    timeStamp: true
})

UserSchema.pre("save", async function (next) { //save se phle password hash krna
    if (!this.isModified("password")) {
        return next()
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return next()

})

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


//.methods se custom func bnte h


const userModel = mongoose.model("user", UserSchema)

module.exports = userModel