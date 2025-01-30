Here’s a structured documentation for your `DashboardLayout` component:

---

## **Dashboard Layout Documentation**

### **Overview**
The `DashboardLayout` component is the primary layout for the admin portal. It provides a flexible and responsive design that includes a sidebar for navigation, a top navigation bar, and a content area where different pages are rendered using `React Router`'s `Outlet`. The layout features dynamic elements like a collapsible sidebar, notifications, a profile dropdown, and enhanced navigation with groups.

---

### **Features**
- **Responsive Sidebar**: Collapsible sidebar that appears on smaller screens (mobile) and remains static on larger screens.
- **Dynamic Title**: Displays page-specific titles based on the current route.
- **Profile Dropdown**: Allows users to manage their profile settings and log out.
- **Notifications Badge**: Displays a notification count on the bell icon.
- **Grouped Navigation**: The sidebar navigation is grouped into categories (e.g., Overview, User Management, Analytics, etc.).
- **Help & Support Link**: Directs users to a help and support page.

---

### **Components**

#### 1. **Sidebar**
- The sidebar is used for primary navigation within the admin portal.
- It contains the logo, navigation links grouped by categories, and a help & support link at the bottom.
  
  **Sidebar Sections**:
  - **Logo Section**: Displays the portal logo (`Admin Portal`), with a link to the dashboard.
  - **Navigation Groups**: The navigation is categorized into sections like *Overview*, *User Management*, *Analytics & Reports*, *System*, and *Communication*. Each section has multiple links, each with an associated icon and optional badge.
    - Example: Under *User Management*, the links for *Users List* and *Add User* are listed with their respective icons.
  - **Help & Support**: Links to a page where users can get help or support.

#### 2. **Top Navigation Bar**
- A responsive header bar that displays the current page title, a toggle button for collapsing the sidebar on mobile, and user-related actions (notifications and profile settings).
  
  **Header Actions**:
  - **Sidebar Toggle**: Button to show/hide the sidebar on smaller screens.
  - **Notifications**: A bell icon with a badge showing the number of unread notifications.
  - **Profile Dropdown**: Displays a dropdown with options to view the profile and log out.
  
#### 3. **Profile Dropdown**
- Provides access to the profile settings and logout functionality. It opens when the profile icon is clicked and displays:
  - **Profile Settings**: Link to the profile settings page.
  - **Logout**: Button to log out and clear the session.

#### 4. **Dynamic Content Area**
- The `main` area where the page content is rendered. This area uses `React Router's` `Outlet` to display the appropriate component based on the route.

---

### **Usage**

1. **Navigating Between Pages**:
   - The sidebar navigation links allow users to navigate between different sections of the admin portal.
   - Each group of links is visually separated with a label (e.g., *Overview*, *User Management*).
   
2. **Responsive Design**:
   - On mobile devices, the sidebar can be toggled open/closed using the hamburger menu.
   - On larger screens, the sidebar is always visible, offering quick access to the navigation.

3. **Changing the Page Title**:
   - The page title dynamically changes based on the current route. The `getTitle` function checks the route and returns a corresponding title for the page.
   - For example, if the user navigates to `/admin/users`, the title will update to "User Management."

4. **Profile Dropdown**:
   - Clicking on the profile icon will open the profile dropdown, which offers options to access profile settings or log out.

5. **Notifications**:
   - The notifications icon will display a badge if there are unread notifications. Clicking it can trigger the display of the notifications, although that functionality isn't defined in this snippet.

---

### **State Management**

- **open**: Controls the state of the sidebar (whether it’s visible or hidden).
- **openProfileDropdown**: Manages the visibility of the profile dropdown.
- **notifications**: A state that holds the number of unread notifications, which is displayed as a badge.
- **messages**: Holds the count of unread messages, which is displayed as a badge next to the "Messages" link in the sidebar.
  
---

### **Event Handling**
- **Sidebar Toggle**:
  - The sidebar visibility toggles when the menu button (hamburger icon) is clicked.
  - On mobile, clicking outside the sidebar will automatically close it.

- **Profile Dropdown**:
  - Clicking on the profile icon toggles the visibility of the dropdown.
  - A click outside of the dropdown (detected by `mousedown`) will close it.

- **Logout**:
  - When the user clicks the *Logout* button in the profile dropdown, the `authToken` is removed from `localStorage`, and the user is redirected to the login page.

---

### **Navigation Structure**
The navigation links are organized into grouped sections. Each section has its own label and includes multiple items, each with the following attributes:
- **path**: The URL path that the link navigates to.
- **label**: The label of the link displayed to the user.
- **icon**: The icon associated with the link, using icons from `lucide-react`.
- **badge** (optional): A badge displayed next to the label for items like messages or notifications.

**Example**:
```js
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
}
```

---

### **Customization**
- **Navigation Items**: You can add or remove navigation items from the `navLinks` array.
- **Icons**: The icons used for navigation links can be customized by importing and using different icons from `lucide-react` or any other icon library.
- **Sidebar Width**: The width of the sidebar can be adjusted by modifying the `w-64` class in the `aside` tag.

---

### **Performance Considerations**
- The sidebar and dropdown menus are optimized with `useState` and `useEffect` hooks to avoid unnecessary re-renders. The `useRef` hook is used to manage the profile dropdown’s visibility state, ensuring it doesn't close when clicking inside the dropdown.

---

### **Conclusion**
The `DashboardLayout` provides a clean and organized layout for an admin portal. With a responsive design, dynamic title updates, and a user-friendly profile and navigation system, this layout offers a robust foundation for building administrative dashboards.

---

This documentation should give both developers and administrators a clear understanding of the layout, its functionality, and how to customize it for specific use cases.