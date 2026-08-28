import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Welcome from "./pages/Welcome.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Board from "./pages/Board.jsx";
import ListView from "./pages/ListView.jsx";
// import TestDesignSystem from "./pages/TestDesignSystem.jsx";
// import ListView from "./pages/ListView.jsx";
// import Board from "./pages/Board.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="board" replace />} />

            <Route path="board" element={<Board />} />
            <Route path="list-view" element={<ListView />} />
            <Route path="my-tasks" element={null} />
          </Route>

          {/* --------------------------------------------- */}
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <ListView />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route path="/design" element={<TestDesignSystem />} /> */}
          {/* <Route path="/board" element={<Board />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
