import User from "../model/userscheme.js";
const Signup = async (request, response) => {
  try {
    const user = request.body;

    const newUser = new User(user); // creating new user
    await newUser.save(); // saving that user in the database through save method of database
    return response.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    return response.status(500).json({ msg: "Error while signing up user" });
  }
};
// request send data from frontend
export default Signup;
