import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthContext } from "../context/useAuthContext";

const AuthForm = () => {
  const location = useLocation();
  const { handleLogin, handleSignup, loginState, currentUser } = useAuthContext();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const schema = yup
    .object()
    .shape({
      email: yup.string().required("An Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    if (location.pathname.includes("signup")) {
      handleSignup(data.email, data.password);
      console.log('user', currentUser)
    }
    if (location.pathname.includes("login")) {
      handleLogin(data.email, data.password);
    }

    console.log(data);
    console.log("errors", errors);
  };

  return (
    <form
      noValidate
      className="flex flex-col justify-between items-center gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>{loginState?.message}</h2>
      <div className="w-full">
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          //   required
          fullWidth
          error={!!errors.email?.message}
          {...register("email")}
        />
        <p className="text-red-400">{errors.email?.message}</p>
      </div>
      <div className="w-full">
        <TextField
          label="Password"
          fullWidth
          {...register("password")}
          type={showPassword ? "text" : "password"}
          error={!!errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {!showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <p className="text-red-400">{errors.password?.message}</p>
      </div>
      <Button variant="contained" type="submit">
        {location.pathname.includes("signup") ? "Sign Up" : "Login"}
      </Button>
      {location.pathname.includes("signup") ? (
        <div>
          Already have an account?{" "}
          <Link className="text-blue-400" to="/auth/login">
            Login
          </Link>
        </div>
      ) : (
        <div>
          Don't have an account?{" "}
          <Link className="text-blue-400" to="/auth/signup">
            Sign up
          </Link>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
