# App Dashboard with Metrics and Chart

## Overview

This project is aimed at developing an interactive console for real-time visualizations, metrics, and insights related to code merges and test activities. The solution will be driven by a Go web server that efficiently processes and serves data to a dynamic frontend interface. Designed for scalability and extensibility, the architecture will allow the seamless integration of additional metrics and chart types.

## Mentorship Team

- **Manas Manohar**
- **Tvisha Raji**
- **Hermione Dadheech**
- **Neha Gupta**

## Project Objectives

- **Dynamic Dashboard:** Build a frontend that aggregates and displays real-time test reports using interactive graphs and charts.
- **Template-Based PR Insights:** Enable users to create and leverage custom templates for code analysis, ensuring tailored views for diverse teams and workflows.
- **Scalable & Modular Architecture:** Develop a modular system that supports the easy addition of new metrics, charts, or data sources with minimal refactoring.

## Key Deliverables

- A comprehensive web application capable of tracking multiple repositories and user activities.
- A customizable analytics feed providing insights into test outcomes and code merge activities.
- Integration of robust charting libraries (e.g., Chart.js, Recharts, D3.js) to ensure high-quality data visualizations.
- A backend powered by Golang, ensuring efficient data processing and serving.
- A persistent storage solution using MongoDB to maintain data integrity and accessibility.

## Technical Stack

- **Frontend:** Next.js for server-side rendering and dynamic interface development.
- **Charting Libraries:** Chart.js, Recharts, or D3.js for rendering interactive and real-time charts.
- **Backend:** Golang for building scalable and high-performance web services.
- **Database:** MongoDB for robust and scalable data storage.

## Project Timeline & Effort

- **Estimated Time:** 350 Hours
- **Difficulty Level:** Medium

## Strategic Considerations

- **Modular Design:** The architecture is designed to be modular, ensuring rapid adaptation to evolving business requirements and integration of future metrics.
- **Scalability:** With a focus on extensibility, the solution will support future integrations with various version control systems and repository hosting services.
- **Real-Time Performance:** Emphasis on dynamic updates and real-time insights ensures actionable data is always at the forefront.
- **Best Practices:** Adhere to Golang best practices and proven dashboard designs (inspired by tools like Grafana) to deliver a robust and reliable system.

## Next Steps

1. **Initial Setup:** Define project structure, repository configuration, and initial environment setup.
2. **Frontend Development:** Begin development of the Next.js frontend, integrating key charting libraries.
3. **Backend Services:** Develop core Golang services responsible for data processing and API endpoints.
4. **Data Integration:** Establish connectivity with MongoDB and integrate with multiple repositories.
5. **Testing & Validation:** Implement comprehensive test suites for both frontend and backend components.
6. **Iterative Enhancements:** Plan for periodic reviews and updates to incorporate additional metrics and features.

<!-- Learning -->

### **1. What is KPI?**

KPI stands for **Key Performance Indicator**. It is a measurable value that shows how effectively a system, team, or business is achieving a specific objective.  
For Keploy’s unit testing dashboard, KPIs could include:

- **Code Merge Frequency** – How often developers merge code.
- **Test Pass/Fail Rate** – The percentage of successful vs. failed test runs.
- **Average Test Execution Time** – How long it takes for unit tests to complete.
- **Bug Detection Rate** – How many issues are caught by unit tests before deployment.

---

### **2. What is a Fellowship? Is it like an Internship?**

- **Fellowship** is typically a **short-term learning or research-based program**, often funded or sponsored by an organization, university, or company.
- **Internship** is usually a **temporary work experience** where you work on real projects for a company.

**Key Differences:**

| Feature   | Fellowship                            | Internship                |
| --------- | ------------------------------------- | ------------------------- |
| Purpose   | Learning, research, or community work | Practical work experience |
| Duration  | Few months to a year                  | Few weeks to 6 months     |
| Paid?     | Sometimes (grants/stipends)           | Often paid                |
| Work Type | Research, development, training       | Hands-on company projects |

If Keploy offers a **fellowship**, it might be **research-focused**, whereas an **internship** might involve working directly on production software.

---

### **3. What is Grafana? How Do I Use It?**

**Grafana** is an **open-source data visualization and monitoring tool**. It helps display real-time analytics using dashboards, graphs, and alerts.

#### **How to Use Grafana?**

1. **Install Grafana** (Self-hosted or cloud version).

   - Download from [Grafana's website](https://grafana.com/)
   - Run using Docker or as a service on a server.

2. **Connect to a Data Source**

   - Common sources: **Prometheus, InfluxDB, MySQL, MongoDB, JSON APIs, etc.**
   - Configure data sources in the **Grafana UI**.

3. **Create Dashboards & Panels**

   - Use charts, tables, and alerts to visualize data like test pass rates or PR activity.

4. **Set Up Real-time Monitoring**
   - Configure **alerts and notifications** for test failures.

For Keploy, **Grafana could help visualize unit test execution, failure trends, and repository activity**.

---

### **4. Define Metrics for Keploy's Dashboard**

For the Keploy console, the following metrics matter:

- **Code Merge Metrics:**

  - Number of PRs merged per day/week.
  - Time taken from PR creation to merge.
  - Number of contributors per repository.

- **Testing Metrics:**

  - Test pass/fail rates per PR.
  - Execution time for each test suite.
  - Number of flaky tests detected.

- **CI/CD Metrics:**
  - Build success/failure rates.
  - Deployment success rate.
  - Number of rollbacks due to failed tests.

These **metrics will be stored in MongoDB** and retrieved via the Go backend.

---

### **5. Risk & Feasibility**

Before building the dashboard, we need to evaluate risks and ensure feasibility:

- **Integration Risks:**

  - Can we fetch **PR and test data from GitHub/GitLab** easily?
  - Does Keploy provide APIs/logs for test execution results?

- **Data Security Risks:**

  - Secure **API authentication** (OAuth for GitHub, GitLab).
  - **Access control**: Prevent unauthorized users from viewing sensitive data.

- **Feasibility Considerations:**
  - Will the **MongoDB schema scale** with increasing repositories?
  - Can we **process real-time test results efficiently** with Go concurrency?

---

### **6. What Are Wireframes?**

A **wireframe** is a visual blueprint of a web application’s layout. It **shows the structure but not final design elements**.

**Example Wireframe for Keploy Dashboard:**

```
----------------------------------------------------------------
|               Header (Logo, Nav, User Profile)               |
----------------------------------------------------------------
| Sidebar (Repos, Filters) |  Main Dashboard (Charts, Metrics) |
----------------------------------------------------------------
|         Recent PRs       |   Test Results Table              |
----------------------------------------------------------------
```

You can use tools like **Figma, Adobe XD, or Balsamiq** to design wireframes.

---

### **What to Do Next?**

1. **Define Core Metrics** – Identify what to track (PR merges, test results, etc.).
2. **Create Wireframes** – Design a rough UI for the dashboard.
3. **Plan Backend & Data Flow** – Define MongoDB schemas and API endpoints.
4. **Develop a Proof-of-Concept (PoC)** – Implement a basic dashboard with sample test data.
5. **Integrate Real Data Sources** – Connect GitHub/GitLab APIs and Keploy’s test results.
6. **Optimize & Extend** – Improve UI/UX and add custom templates for test reports.