import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  User,
  X,
  Home,
  Users,
  FileText,
  DollarSign,
  AlertCircle,
  ShoppingCart,
  BarChart3,
  Settings,
  Bell,
  Mail,
  HelpCircle,
  Shield,
  PlusCircle,
  ActivitySquare,
} from "lucide-react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openProfileDropdown &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setOpenProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openProfileDropdown]);

  const getTitle = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Dashboard Overview";
      case "/admin/users":
        return "User Management";
      case "/admin/users/create":
        return "Create New User";
      case "/admin/reports":
        return "Analytics Reports";
      case "/admin/revenue":
        return "Revenue Analytics";
      case "/admin/logs":
        return "System Logs";
      case "/admin/orders-cost":
        return "Orders & Costs";
      case "/admin/settings":
        return "System Settings";
      case "/admin/messages":
        return "Messages";
      default:
        return "Dashboard";
    }
  };

  const handleLogout = () => {
    console.log("bomboclat!");
  };

  // Enhanced navigation structure with grouping
  const navLinks = [
    // Overview Section
    {
      group: "Overview",
      items: [
        {
          path: "/admin/dashboard",
          label: "Dashboard",
          icon: <Home size={20} />,
        },
      ],
    },
    // User Management Section
    {
      group: "User Management",
      items: [
        {
          path: "/admin/users",
          label: "Users List",
          icon: <Users size={20} />,
        },
        {
          path: "/admin/users/create",
          label: "Add User",
          icon: <PlusCircle size={20} />,
        },
      ],
    },
    // Analytics & Reports Section
    {
      group: "Analytics & Reports",
      items: [
        {
          path: "/admin/reports",
          label: "Reports",
          icon: <FileText size={20} />,
        },
        {
          path: "/admin/revenue",
          label: "Revenue",
          icon: <DollarSign size={20} />,
        },
        {
          path: "/admin/orders-cost",
          label: "Orders & Costs",
          icon: <ShoppingCart size={20} />,
        },
      ],
    },
    // System Section
    {
      group: "System",
      items: [
        {
          path: "/admin/logs",
          label: "System Logs",
          icon: <ActivitySquare size={20} />,
        },
        {
          path: "/admin/settings",
          label: "Settings",
          icon: <Settings size={20} />,
        },
      ],
    },
    // Communication Section
    {
      group: "Communication",
      items: [
        {
          path: "/admin/messages",
          label: "Messages",
          icon: <Mail size={20} />,
          badge: messages,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-green-600 text-white
          transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Logo area */}
          <div className="p-4 border-b border-green-500">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={24} />
              <NavLink
                to="/admin"
                className="text-2xl font-bold hover:text-green-100 transition-colors"
              >
                Admin Portal
              </NavLink>
            </div>
            <div className="text-sm text-green-100">Welcome, Yohana</div>
          </div>

          {/* Enhanced Navigation with Groups */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navLinks.map((group, index) => (
              <div key={index} className="mb-6">
                <div className="px-4 mb-2 text-sm font-semibold text-green-200">
                  {group.group}
                </div>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-4 py-2 transition-colors
                          ${
                            isActive
                              ? "bg-green-700 text-white"
                              : "hover:bg-green-700/50"
                          }`
                        }
                      >
                        <div className="flex items-center">
                          <span className="mr-2">{item.icon}</span>
                          {item.label}
                        </div>
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-green-500 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Help & Support Section */}
          <div className="p-4 border-t border-green-500">
            <NavLink
              to="/admin/support"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-green-700/50 rounded-lg"
            >
              <HelpCircle size={20} />
              <span>Help & Support</span>
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Enhanced Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Enhanced Top navigation bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 -ml-2 md:hidden hover:bg-gray-100 rounded-lg"
                aria-label="Toggle sidebar"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {getTitle()}
              </h1>
            </div>

            {/* Enhanced Header Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Enhanced Profile dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">Admin</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openProfileDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openProfileDropdown && (
                  <div
                    ref={profileDropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                  >
                    <NavLink
                      to="/admin/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                      Profile Settings
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
