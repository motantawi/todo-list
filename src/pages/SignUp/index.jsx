import React, { useState, useCallback, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useUser from "@hooks/useUser";
import { createAccountSchema } from "@utils/Schema";
import { requestCreateUser } from "@api/auth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleClickShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleCreateUser = useCallback(
    async ({ firstName, lastName, email, password }) => {
      try {
        if (!termsChecked) {
          toast.error("You must accept the Terms and Conditions to sign up.");
          return;
        }

        await requestCreateUser({ firstName, lastName, email, password });
        toast.success("User created successfully");
        navigate("/login");
      } catch (error) {
        console.error("Error during sign up:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    },
    [navigate, termsChecked]
  );

  useEffect(() => {
    if (user) {
      navigate("/todos");
    }
  }, [user, navigate]);

  return (
    <Container component="main" maxWidth="md">
      <Typography
        component="h1"
        variant="h4"
        sx={{
          position: "relative",
          top: 60,
          color: "primary.main",
          textAlign: "center",
          mt: 1,
        }}
      >
        Create An Account
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{ position: "fixed", top: 15, left: 15 }}
      >
        Todo List
      </Button>
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 2,
          py: 5,
          maxWidth: 400,
          mx: "auto",
          mb: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SignUp
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleCreateUser)}
          sx={{ mt: 2, width: "90%" }}
        >
          <TextField
            label="First Name"
            required
            variant="outlined"
            fullWidth
            sx={{ marginY: 0 }}
            margin="normal"
            {...register("firstName", { required: "First name is required" })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("lastName", { required: "Last name is required" })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />
          <TextField
            label="Email"
            required
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            required
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            required
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("confirmPassword", {
              required: "Confirm your password",
            })}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Terms and Conditions Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
                name="terms"
                color="primary"
              />
            }
            label="I accept the Terms and Conditions"
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign Up
          </Button>
          <Typography
            variant="body2"
            sx={{
              ml: "auto",
              textDecoration: "underline",
              cursor: "pointer",
              display: "block",
            }}
            onClick={() => navigate("/login")}
          >
            Have an account? Sign in
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
