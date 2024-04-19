import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { USER_API_URL } from "../../constants/const";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loader";

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [code, setCode] = useState(null);
  const [load, setLoad] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    setPasswordsMatch(true); // Reset passwordsMatch to true on any change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordsMatch(false);
    } else {
      try {
        setLoad(true);
        const response = await axios.post(`${USER_API_URL}/resetPassword`, {
          data: {
            resetCode: code,
            newPassword: passwords.confirmPassword,
          },
        });
        console.log("🚀 + handleSubmit + response:", response);
        if (response.status === 200) {
          notifySuccess(response.data.message);
          setLoad(false);
          setTimeout(() => {
            navigate("/sign-in");
          }, 3000);
        }
      } catch (error) {
        console.log("🚀 + handleSubmit + error:", error.response.data.message);
        notifyErr(error.response.data.message);
        setLoad(false);
      }
    }
  };
  const notifyErr = (mes) => toast.error(mes);
  const notifySuccess = (mes) => toast.success(mes);
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {load ? (
            <Loader />
          ) : (
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
          )}
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CustomInput
              margin="normal"
              required
              fullWidth
              id="code"
              label="Enter verification code"
              name="code"
              autoFocus
              type="number"
              onChange={(e) => setCode(e.target.value)}
            />
            <CustomInput
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="new-password"
              autoComplete="new-password"
              value={passwords.newPassword}
              onChange={handleChange}
            />
            <CustomInput
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="confirm-password"
              value={passwords.confirmPassword}
              onChange={handleChange}
              error={!passwordsMatch}
              helperText={!passwordsMatch && "Passwords do not match"}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default ResetPassword;
