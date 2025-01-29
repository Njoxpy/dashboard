import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// admin
import DashboardLayout from "./admin/layout/DashboardLayout";
import DashboardHome from "./admin/pages/DashboardHome";
import UsersPage from "./admin/pages/UsersPage";
import ReportsPage from "./admin/pages/ReportsPage";
import AddUserPage from "./admin/components/AddUserPage";
import RevenueDashboard from "./admin/pages/RevenueDashboard";
import AuditLogs from "./admin/components/AuditLogs";
import OrdersCostDashboard from "./admin/pages/OrdersCostDashboard";

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="admin/*" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/create" element={<AddUserPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="revenue" element={<RevenueDashboard />} />
        <Route path="logs" element={<AuditLogs />} />
        <Route path="Orders-Cost" element={<OrdersCostDashboard />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
