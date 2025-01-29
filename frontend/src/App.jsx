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
import DashboardOverview from "./admin/pages/DashboardOverview";
import Messages from "./admin/components/Messages";
import Settings from "./admin/components/Settings";
import Support from "./admin/components/Support";
import ProfilePage from "./admin/components/ProfilePage";

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="admin/*" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="users/create" element={<AddUserPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="revenue" element={<RevenueDashboard />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
        <Route path="logs" element={<AuditLogs />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="Orders-Cost" element={<OrdersCostDashboard />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
