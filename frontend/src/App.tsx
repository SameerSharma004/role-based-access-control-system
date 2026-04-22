import { Route, Routes } from "react-router-dom";
import Home from "./pages/Employee/EmployeeHome";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import DashboardLayout from "./dashboardLayout/DashboardLayout";
import AdminHome from "./pages/Admin/AdminHome";
import ManagerHome from "./pages/Manager/ManagerHome";
import AdminLayout from "./dashboardLayout/AdminLayout";
import ManagerLayout from "./dashboardLayout/ManagerLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<AdminLayout />}>
          <Route path="admin" element={<AdminHome />} />
        </Route>
        <Route path="/" element={<ManagerLayout />}>
          <Route path="manager" element={<ManagerHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
