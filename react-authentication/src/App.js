import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import UserComponent from "./components/UserComponent";
import AdminComponent from "./components/AdminComponent";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./redux/slices/authSlice";
import { selectIsAdmin } from "./redux/slices/authSlice";
import List from "./components/List/List";
import Cart from "./components/Cart/Cart";
function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const admin = useSelector(selectIsAdmin);

  return (
    <>
      {isAuthenticated ? (
        <>
          {admin ? (
            <Router>
              <Routes>
                <Route path="/user" element={<UserComponent />} />
                <Route path="/admin" element={<AdminComponent />} />
                <Route path="/list" element={<List />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="*" element={<Navigate to="/user" />} />
              </Routes>
            </Router>
          ) : (
            <Router>
              <Routes>
                <Route path="/user" element={<UserComponent />} />
                <Route path="/list" element={<List />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="*" element={<Navigate to="/user" />} />
              </Routes>
            </Router>
          )}
        </>
      ) : (
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
