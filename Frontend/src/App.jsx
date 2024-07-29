// App.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Layout from "./components/ui/Layout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute"; // Import correctly
import Employees from "./pages/Employees";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Route for login */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
          </Route>
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
        </Route>
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
