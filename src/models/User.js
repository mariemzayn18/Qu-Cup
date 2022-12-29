import mongoose from "mongoose";
import bcrypt from "bcryptjs"
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://0.0.0.0:27017/test')

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(password){
            if(password.length < 6)
                throw new error("Password length is less than 6")
        }
    },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthDate: {type: Date, required: true},
    gender: {type: String, required: true},
    nationality: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String},
    approved: {type: Boolean}
})

UserSchema.virtual('reservations', {
  ref : 'Reservation',
  localField : '_id',
  foreignField : 'owner'
})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12);
})

UserSchema.statics.loginCheck = async (username, password) => {
    const existing_user = await userData.findOne({userName: username})
    if(existing_user){
        console.log(existing_user)
        const matchedPassword = bcrypt.compare(password ,existing_user.password)
        if(matchedPassword && existing_user.approved ) return existing_user
        throw new Error("Wrong Password or not approved")
    }
    else throw new Error("Wrong username")
}


const userData = mongoose.model('UserData', UserSchema)
export {userData}

