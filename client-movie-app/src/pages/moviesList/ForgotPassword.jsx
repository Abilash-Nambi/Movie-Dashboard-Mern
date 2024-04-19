import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { USER_API_URL } from "../../constants/const";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { CustomInput } from "../../components/CustomInput";
import Loader from "../../components/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [load, setLoad] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      try {
        setLoad(true);
        const response = await axios.post(`${USER_API_URL}/forgetPassword`, {
          data: {
            email,
          },
        });

        if (response.status === 200) {
          setLoad(false);
          notifySuccess(response.data.message);
          setTimeout(() => {
            navigate("/reset-password");
          }, 3000);
        }
      } catch (error) {
        console.log("🚀 + handleSubmit + error:", error.response.data.message);
        notifyErr(error.response.data.message);
        setLoad(false);
      }

      setEmail("");
      setEmailError("");
    }
  };

  const handleBlur = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
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
            Enter your Registered mail id
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!emailError}
              helperText={emailError}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/sign-in" variant="body2">
                  {"Go back to sign-in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <ToastContainer />
      </Container>
    </div>
  );
};

export default ForgotPassword;
