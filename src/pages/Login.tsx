import { Typography } from "@mui/material";
import AuthForm from "../components/AuthForm";

const Login = () => {
  return (
    <section className="border border-black w-[500px] max-w-[95vw] p-5">
      <Typography variant="h4" sx={{marginBottom: '2rem'}}>Login</Typography>
      <AuthForm />
    </section>
  );
};

export default Login;
