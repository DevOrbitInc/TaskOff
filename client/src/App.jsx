import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Welcome from "./pages/Welcome.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TestDesignSystem from "./pages/TestDesignSystem.jsx";
import ListView from "./pages/ListView.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <ListView />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          <Route path="/design" element={<TestDesignSystem />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="taskoff" element={<TaskOff/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
