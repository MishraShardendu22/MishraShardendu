### **Wireframe 1: Desktop Layout**

```
+--------------------------------------------------------------------------------+
|                                HEADER                                          |
|  [Logo] [Navigation Menu: Dashboard | Repos | Settings] [User Profile Icon]    |
+--------------------------------------------------------------------------------+
|                                |                                               |
|        SIDEBAR                 |                MAIN CONTENT                   |
|  ---------------------         |  ---------------------------------------      |
|  | - Repositories    |         |  |   Chart: Code Merge Frequency       |      |
|  | - Filters         |         |  |-------------------------------------|      |
|  | - Team Activity   |         |  |   Chart: Test Pass/Fail Rate        |      |
|  | - Alerts          |         |  |-------------------------------------|      |
|  ---------------------         |  |   Chart: Average Test Execution Time|      |
|                                |  ---------------------------------------      |
|                                |                                               |
+--------------------------------------------------------------------------------+
|                                FOOTER                                          |
|        [Additional Stats]   [Legal / Copyright Info]                           |
+--------------------------------------------------------------------------------+
```

*Overview:*
- **Header:** Contains the logo, a navigation menu for key sections (Home, Repos, Metrics), and a user profile icon.
- **Sidebar:** Provides access to repositories, filters, team activities, and alerts.
- **Main Content:** Focuses on displaying key charts such as code merge frequency, test pass/fail rate, and average test execution time.
- **Footer:** Optional area for additional statistics or legal information.

---

### **Wireframe 2: Mobile/Responsive Layout**

```
+-------------------------------------------------+
|                  HEADER                         |
|  [Logo]  [Hamburger Menu]  [User Icon]          |
+-------------------------------------------------+
|                 DASHBOARD                       |
|  -------------------------------------------    |
|  | Chart: Code Merge Frequency           |      |
|  -------------------------------------------    |
|  -------------------------------------------    |
|  | Chart: Test Pass/Fail Rate            |      |
|  -------------------------------------------    |
|  -------------------------------------------    |
|  | Chart: Average Test Execution Time     |     |
|  -------------------------------------------    |
+-------------------------------------------------+
|                  SIDEBAR (Drawer Menu)          |
|  - Repositories                                 |
|  - Filters                                      |
|  - Team Activity                                |
|  - Alerts                                       |
+-------------------------------------------------+
|                  FOOTER                         |
|       [Additional Stats / Info]                 |
+-------------------------------------------------+
```

*Overview:*
- **Header:** Simplified with a logo, a hamburger menu (which opens the sidebar as a drawer), and a user icon.
- **Dashboard Area:** Main charts are stacked vertically for easy viewing on mobile screens.
- **Sidebar/Drawer Menu:** Accessed via the hamburger menu, offering navigation to repositories, filters, and more.
- **Footer:** Contains additional stats or information in a condensed format.
