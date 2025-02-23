import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
  
    // Remove user data (optional)
    localStorage.removeItem("user");
  
    // Redirect to the login page
    navigate("/");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/sessions/create", {
        email,
        password,
      });
  
      console.log("Login Success:", response.data);
  
      // Store tokens in localStorage
      localStorage.setItem("id_token", response.data.id_token);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("role", response.data.role);
  
      // Store user data (optional)
      localStorage.setItem("user", JSON.stringify(response.data.user));
  
      // Navigate to the homepage
      navigate("/home");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Incorrect email or password";
      setError(errorMessage);
    }
  
    setLoading(false);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Login
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#3b82f6", color: "white" }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;