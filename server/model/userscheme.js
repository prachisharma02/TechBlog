import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema); // collection(like tables) bnana padta hai mongo me to user is collection name in which data will be stored
// jiske andar ye userschema store hoga
export default User;
