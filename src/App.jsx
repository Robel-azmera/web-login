import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          {/* Add more protected routes here */}
        </Route>

        {/* Default Redirect
        <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;