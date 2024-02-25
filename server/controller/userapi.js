import User from "../model/userscheme.js";
import bcrypt from "bcrypt";
const Signup = async (request, response) => {
  try {
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new User(user); // creating new user
    await newUser.save(); // saving that user in the database through save method of database
    return response.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    return response.status(500).json({ msg: "Error while signing up user" });
  }
};
// request send data from frontend
export default Signup;
