import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AppContext } from "../providers/AppContextProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function Login() {
  const { loginUser, error } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState<string | null>("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    submitted && setError(error);
  }, [submitted, error]);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await loginUser(email, password);
    response && navigate("/dashboard");
    setSubmitted(true);
  }

  return (
    <Stack
      spacing={2}
      component="form"
      direction="column"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      onSubmit={handleSubmit}
    >
      <h1>Login</h1>
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
      <Typography color="error">{errorMessage}</Typography>
    </Stack>
  );
}
