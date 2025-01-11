import mongoose from 'mongoose';

 const userSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    address:String,
    phone:Number,
    picture:String,
    role:{
        type:String,
        enum:['ADMIN','NORMAL'],
        default:'NORMAL',
    }
    
})
const User = mongoose.model("user",userSchema);
export default User;