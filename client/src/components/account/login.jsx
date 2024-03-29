import { Box, TextField, Button, styled, Typography } from "@mui/material";
import Images from "../images/bg.png";
import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { API } from "../../service/api";
import { DataContext } from "../../context/dataprovider";
import { useNavigate } from "react-router-dom"; //custom hooks for navigation
const Component = styled(Box)`
  margin: auto;
  width: 400px;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;
const Container = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
`;
const Log = styled(Button)`
  background: #7c3185;
  margin: 10px 0 10px 0;
  &:hover {
    background-color: #7c3185;

    border-color: #7c3185;
  }
`;
const Sign = styled(Button)`
  border: 1px solid #7c3185;
  color: #7c3185;
  margin: 10px 0 10px 0;
  &:hover {
    border-color: #7c3185;
  }
`;
const signvalues = {
  name: "",
  usernames: "",
  password: "",
};
const loginInitialValues = {
  username: "",
  password: "",
};
const Login = () => {
  const [account, toggleaccount] = useState("login");
  const [signup, setsignup] = useState(signvalues);
  const [error, showError] = useState("");
  const [login, setLogin] = useState(loginInitialValues);
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const togglesign = () => {
    toggleaccount("signup");
  };

  const togglelog = () => {
    toggleaccount("login");
  };
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const oninputchange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
  };

  // so here we dont want to overwrite we want to just append the value and here e.target.name is acting as a key
  //and value is acting as a actual value from signvalues object

  const SignupUser = async () => {
    try {
      const response = await API.userSignup(signup);
      if (response.isSuccess) {
        showError("");
        setsignup(signvalues);
        togglelog("login");
      } else {
        showError("Something went wrong! please try again later");
      }
    } catch (error) {
      showError(error.msg); //to tell whats the error
    }
  };
  const loginUser = async () => {
    let response = await API.userLogin(login); //config.js se userlogin h
    if (response.isSuccess) {
      showError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        username: response.data.username,
      });

      // isUserAuthenticated(true);
      setLogin(loginInitialValues);
      navigate("/");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  return (
    <>
      <img src={Images} style={{ height: 100 }} alt="login" />
      <motion.h1
        animate={{ color: "#421d47", fontSize: 100, x: 500 }}
        style={{ textAlign: "left" }}
      >
        Welcome to DevLog
      </motion.h1>

      {account === "login" ? (
        <Component>
          <Container>
            <TextField
              style={{ paddingBottom: 10 }}
              id="standard-basic"
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter username"
              variant="standard"
            />
            <TextField
              style={{ paddingBottom: 10 }}
              id="standard-basic"
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
              variant="standard"
            />{" "}
            {error && <Typography>{error}</Typography>}
            <Log
              style={{ paddingBottom: 10 }}
              variant="contained"
              color="success"
              onClick={() => loginUser()}
            >
              Login
            </Log>
            <Typography style={{ textAlign: "center", color: "#7c3185" }}>
              OR
            </Typography>
            <Sign
              onClick={togglesign}
              style={{ paddingBottom: 10 }}
              variant="outlined"
            >
              Create Account
            </Sign>
          </Container>
        </Component>
      ) : (
        <Component>
          <Container>
            <TextField
              style={{ paddingBottom: 10 }}
              // id="standard-basic"
              label="Name"
              variant="standard"
              onChange={(e) => oninputchange(e)}
              name="name"
            />
            <TextField
              style={{ paddingBottom: 10 }}
              // id="standard-basic"
              label="Username"
              variant="standard"
              onChange={(e) => oninputchange(e)}
              name="username"
            />
            <TextField
              style={{ paddingBottom: 10 }}
              id="standard-basic"
              label="Password"
              variant="standard"
              onChange={(e) => oninputchange(e)}
              name="password"
              type="password"
            />
            <Log
              style={{ paddingBottom: 10 }}
              variant="contained"
              color="success"
              onClick={SignupUser}
            >
              Register
            </Log>
            <Typography style={{ textAlign: "center", color: "#7c3185" }}>
              OR
            </Typography>
            <Sign
              onClick={togglelog}
              style={{ paddingBottom: 10 }}
              variant="outlined"
            >
              Already have an account
            </Sign>
          </Container>
        </Component>
      )}
    </>
  );
};
export default Login;
