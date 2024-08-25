import { useState, useCallback, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useUser from "@hooks/useUser";
import { loginSchema } from "@utils/Schema";
import { requestLogin } from "@api/auth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      try {
        const userData = await requestLogin({ email, password });
        setUser(userData);
        toast.success("Logged in successfully");
        navigate("/todos");
      } catch (error) {
        console.error("Error during sign in:", error.message);
        toast.error("Invalid email or password");
      }
    },
    [navigate, setUser]
  );

  useEffect(() => {
    if (user !== null) {
      navigate("/todos");
    }
  }, [user, navigate]);
  return (
    <>
      <Container component="main" maxWidth="md">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            position: "relative",
            top: 60,
            color: "primary.main",
            textAlign: "center",
            mb: 15,
            mt: 5,
          }}
        >
          Welcome Back
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
            mt: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 2,
            py: 5,
            maxWidth: 380,
            mx: "auto",
            mb: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleLogin)}
            sx={{ mt: 2, width: "90%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete={"off"}
              autoFocus={false}
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              onChange={() => setError("email", { message: "" })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="off"
              autoFocus={false}
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              onChange={() => setError("password", { message: "" })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Typography
              variant="body2"
              sx={{
                ml: "auto",
                textDecoration: "underline",
                cursor: "pointer",
                display: "block",
              }}
              onClick={() => navigate("/register")}
            >
              Don’t have an account? Sign Up
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
