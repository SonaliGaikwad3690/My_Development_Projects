import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EmployeeList from "./pages/employees/EmployeeList";
import AddEmployee from "./pages/employees/AddEmployee";
import EditEmployee from "./pages/employees/EditEmployee";
import InactiveEmployees from "./pages/employees/InactiveEmployees";
import EmployeeView from "./pages/employees/EmployeeView";
import HolidayList from "./pages/holidays/HolidayList";
import AddHoliday from "./pages/holidays/AddHoliday";
import EditHoliday from "./pages/holidays/EditHoliday";
import InactiveHolidays from "./pages/holidays/InactiveHolidays";
import ViewHoliday from "./pages/holidays/ViewHoliday";

function PrivateRoute({ children }) {
  return localStorage.getItem("loggedIn") === "true"
    ? children
    : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

      <Route path="/employees" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
      <Route path="/employees/add" element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
      <Route path="/employees/edit/:id" element={<PrivateRoute><EditEmployee /></PrivateRoute>} />
      <Route path="/employees/inactive" element={<PrivateRoute><InactiveEmployees /></PrivateRoute>} />
      <Route path="/employees/view/:id" element={<PrivateRoute><EmployeeView /></PrivateRoute>} />

      <Route path="/holidays" element={<PrivateRoute><HolidayList /></PrivateRoute>} />
      <Route path="/holidays/add" element={<PrivateRoute><AddHoliday /></PrivateRoute>} />
      <Route path="/holidays/edit/:id" element={<PrivateRoute><EditHoliday /></PrivateRoute>} />
      <Route path="/holidays/inactive" element={<PrivateRoute><InactiveHolidays /></PrivateRoute>} />
      <Route path="/holidays/view/:id" element={<PrivateRoute><ViewHoliday /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}