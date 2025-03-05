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
import ContentDashboard from "./admin/pages/ContentDashboard";
import ContentDetails from "./admin/pages/ContentDetails";
import UserDetailsPage from "./admin/components/UserDetailsPage";
import MessageDetail from "./admin/components/MessageDetail";
import EditProfilePage from "./admin/components/EditProfilePage";

import NotFound from "./NotFound";
// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="admin/*" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="users">
          <Route index element={<UsersPage />} />
          <Route path=":id" element={<UserDetailsPage />} />{" "}
          {/* Uncommented for user details */}
          <Route path="create" element={<AddUserPage />} />
        </Route>
        <Route path="dashboard" element={<DashboardOverview />} />{" "}
        {/* If necessary, or remove if redundant */}
        <Route path="reports" element={<ReportsPage />} />
        <Route path="revenue" element={<RevenueDashboard />} />
        <Route path="contents" element={<ContentDashboard />} />
        <Route path="contents/:id" element={<ContentDetails />} />
        <Route path="messages" element={<Messages />} />
        <Route path="messages/:id" element={<MessageDetail />} />{" "}
        {/* For message details */}
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
        <Route path="logs" element={<AuditLogs />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<EditProfilePage />} />{" "}
        {/* Add profile editing */}
        <Route path="Orders-Cost" element={<OrdersCostDashboard />} />
        <Route path="*" element={<NotFound />} /> {/* 404 route */}
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
