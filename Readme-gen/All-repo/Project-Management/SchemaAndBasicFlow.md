# 1. Database Schema

## **Users Table**

| Column           | Type           | Notes                          |
| ---------------- | -------------- | ------------------------------ |
| **id**           | UUID or Serial | Primary key                    |
| **username**     | String         | Unique; required               |
| **email**        | String         | Unique; required               |
| **passwordHash** | String         | Hashed password                |
| **createdAt**    | Timestamp      | Defaults to current timestamp  |
| **updatedAt**    | Timestamp      | Updates on record modification |

## **Projects Table**

| Column          | Type           | Notes                                        |
| --------------- | -------------- | -------------------------------------------- |
| **id**          | UUID or Serial | Primary key                                  |
| **userId**      | UUID           | Foreign key referencing `Users.id`; required |
| **name**        | String         | Required                                     |
| **description** | Text           | Optional                                     |
| **dueDate**     | Date           | Optional (for deadline tracking)             |
| **createdAt**   | Timestamp      | Defaults to current timestamp                |
| **updatedAt**   | Timestamp      | Updates on record modification               |

## **Tasks Table**

| Column          | Type           | Notes                                                                   |
| --------------- | -------------- | ----------------------------------------------------------------------- |
| **id**          | UUID or Serial | Primary key                                                             |
| **projectId**   | UUID           | Foreign key referencing `Projects.id`; required (or null if unassigned) |
| **title**       | String         | Required                                                                |
| **description** | Text           | Optional                                                                |
| **priority**    | Integer/Enum   | E.g., 1 (High), 2 (Medium), 3 (Low)                                     |
| **dueDate**     | Date           | Optional                                                                |
| **isCompleted** | Boolean        | Defaults to `false`                                                     |
| **createdAt**   | Timestamp      | Defaults to current timestamp                                           |
| **updatedAt**   | Timestamp      | Updates on record modification                                          |

## **Categories Table (Optional)**

If you choose to support task categorization separate from projects:

| Column     | Type           | Notes                                        |
| ---------- | -------------- | -------------------------------------------- |
| **id**     | UUID or Serial | Primary key                                  |
| **userId** | UUID           | Foreign key referencing `Users.id`; required |
| **name**   | String         | Required (e.g., “Work”, “Personal”)          |

_Note:_ You could link tasks to categories with a join table if you allow many-to-many associations.

---

## 2. API Routes

Implement these endpoints using the Next.js App Router (with middleware for authentication/validation). They’ll be organized under the `/api` directory.

### **Authentication Endpoints**

- **POST `/api/auth/signup`**  
  _Description:_ Create a new user account.
- **POST `/api/auth/login`**  
  _Description:_ Log in a user and return a session/token.
- **POST `/api/auth/logout`**  
  _Description:_ Log out the user (invalidate the session/token).

### **Projects Endpoints**

- **GET `/api/projects`**  
  _Description:_ Retrieve all projects for the authenticated user.
- **POST `/api/projects`**  
  _Description:_ Create a new project.  
  _Payload:_ `{ name, description, dueDate }`
- **GET `/api/projects/[projectId]`**  
  _Description:_ Get details for a specific project.
- **PUT `/api/projects/[projectId]`**  
  _Description:_ Update a project’s details.
- **DELETE `/api/projects/[projectId]`**  
  _Description:_ Delete a project.

### **Tasks Endpoints**

- **GET `/api/tasks`**  
  _Description:_ Retrieve all tasks for the user. (Add filtering by `projectId` or `category` as needed.)
- **POST `/api/tasks`**  
  _Description:_ Create a new task.  
  _Payload:_ `{ projectId, title, description, priority, dueDate }`
- **GET `/api/tasks/[taskId]`**  
  _Description:_ Retrieve details for a specific task.
- **PUT `/api/tasks/[taskId]`**  
  _Description:_ Update task details (e.g., marking as complete, editing description).
- **DELETE `/api/tasks/[taskId]`**  
  _Description:_ Delete a task.

### **Categories Endpoints (Optional)**

- **GET `/api/categories`**  
  _Description:_ Retrieve all categories for the user.
- **POST `/api/categories`**  
  _Description:_ Create a new category.
- **PUT `/api/categories/[categoryId]`**  
  _Description:_ Update a category.
- **DELETE `/api/categories/[categoryId]`**  
  _Description:_ Delete a category.

---

## 3. Pages / UI Structure

### **Public (Unauthenticated) Pages**

- **Landing Page (`/`)**

  - **Sections:** Header, Hero, Features, Call-to-Action (CTA), Footer
  - **Purpose:** Introduce the product, highlight features, and provide links to sign up or log in.

- **Signup Page (`/signup`)**

  - **Purpose:** Registration form for new users.

- **Login Page (`/login`)**
  - **Purpose:** Login form for existing users.

### **Protected (Authenticated) Pages**

All these pages require the user to be logged in. Use middleware (or client-side checks) to protect them.

#### **Dashboard Layout (Common Shell)**

- **Dashboard Home (`/dashboard`)**
  - **Features:** Overview (could include task statistics, upcoming deadlines) and a sidebar navigation (links to Projects, Tasks, Calendar, Profile/Settings).

#### **Project Management Pages**

- **Projects List (`/dashboard/projects`)**
  - **Content:** List all projects belonging to the user.
  - **Actions:** “Add New Project” button to navigate to the creation form.
- **New Project (`/dashboard/projects/new`)**
  - **Content:** Form for creating a new project (fields for name, description, due date, etc.).
- **Project Details (`/dashboard/projects/[projectId]`)**
  - **Content:** Detailed view of a single project.
  - **Actions:** Display project info, list associated tasks, and provide options to edit or delete the project. Also, a button or form to add a new task to the project.
- **Edit Project (`/dashboard/projects/[projectId]/edit`)**
  - **Content:** Pre-populated form allowing the user to update project details.

#### **Task Management Pages**

- **Tasks List (`/dashboard/tasks`)**
  - **Content:** Lists all tasks (with possible filtering options by project, due date, or category).
- **New Task (`/dashboard/tasks/new`)**
  - **Content:** Form to create a new task.
  - **Options:** Option to assign the task to a specific project; set title, description, priority, due date.
- **Task Details (`/dashboard/tasks/[taskId]`)**
  - **Content:** Detailed view of a task with status and details.
- **Edit Task (`/dashboard/tasks/[taskId]/edit`)**
  - **Content:** Form to update task information.

#### **Calendar View**

- **Calendar (`/dashboard/calendar`)**
  - **Content:** A calendar widget displaying tasks on their due dates.
  - **Purpose:** Helps users visualize deadlines and plan accordingly.

#### **Additional Pages (Optional)**

- **Profile/Settings (`/dashboard/profile` or `/dashboard/settings`)**
  - **Content:** Manage account details, change preferences (e.g., toggle dark mode), etc.

---

## 4. Overall Workflow

1. **Landing & Authentication:**

   - **User Journey:**
     - A user lands on the homepage and reads about the product.
     - The user chooses to sign up (or log in if already registered).
   - **Technical Flow:**
     - Signup/Login forms call `/api/auth/signup` or `/api/auth/login`.
     - On successful authentication, the user is redirected to `/dashboard`.

2. **Dashboard Navigation:**

   - **User Journey:**
     - Once logged in, the user sees a dashboard with a sidebar linking to Projects, Tasks, and Calendar.
   - **Technical Flow:**
     - Use a shared layout component (or App Router’s nested layouts) to render the sidebar and header.

3. **Project Management:**

   - **User Journey:**
     - The user clicks “Projects” from the sidebar.
     - They see a list of their projects on `/dashboard/projects`.
     - Clicking “Add New Project” navigates to `/dashboard/projects/new`.
     - After filling out the form, the form submits a POST to `/api/projects`.
     - Upon success, the user is redirected to the new project’s detail page (`/dashboard/projects/[projectId]`).
     - In the project detail page, the user can edit or delete the project, or add tasks.
   - **Technical Flow:**
     - API endpoints handle CRUD operations on projects.
     - Use React Query to fetch and update project data, with optimistic UI updates for better UX.

4. **Task Management:**

   - **User Journey:**
     - From either the project detail page or the main tasks page (`/dashboard/tasks`), the user can create a new task.
     - The new task form (in `/dashboard/tasks/new`) collects task details and (optionally) assigns it to a project.
     - Once submitted, the task is created via a POST to `/api/tasks` and appears in the task list.
     - The user can view, edit, or mark tasks as completed.
   - **Technical Flow:**
     - API endpoints manage task CRUD.
     - React Query manages fetching, caching, and error handling; Zustand can be used for any cross-component state (e.g., currently selected project).

5. **Calendar Integration:**
   - **User Journey:**
     - The user navigates to `/dashboard/calendar` to see a visual schedule.
     - Tasks appear on the calendar based on their due dates.
   - **Technical Flow:**
     - The calendar component pulls task data (with due dates) from the API and renders it in a calendar view (using a library or custom component).
