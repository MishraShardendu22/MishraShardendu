# **Collaboration Guidelines & Setup Instructions**

## **General Collaboration Rules**

1. **Meaningful Comments:**  
   - Always write meaningful comments in the code to explain your thought process.
   - Never remove existing comments from other developers or users.
   - Ensure your comments align with the context and functionality of the code.

2. **Strict Adherence to Structure & Methodology:**  
   - Follow the established folder structure and methodology throughout the project.
   - Ensure that any additions or modifications do not disrupt the existing workflow or code style.

3. **Commit Messages:**  
   - Write clear and concise commit messages.
   - Use commit messages that accurately reflect the purpose of the change.
   - Only create meaningful and relevant commit messages for each change.

---

## **Frontend Setup**

1. **Lucide React for Icons:**  
   - We are using [Lucide React](https://github.com/lucide-icons/lucide) for scalable, customizable icons.
   - Follow the documentation for implementation.

2. **Tailwind CSS Integration:**  
   - Tailwind CSS is set up for utility-first styling.
   - Ensure that classes follow the design system and are not abused.
   - Always use utility classes for responsive design and layout control.

3. **ShadCN Setup:**  
   - [ShadCN](https://github.com/shadcn/ui) is integrated for building beautiful and accessible components with Tailwind CSS.
   - Follow ShadCN's conventions and component usage when building the UI elements.

4. **Framer Motion Integration:**  
   - [Framer Motion](https://www.framer.com/motion/) is used for animations and transitions.
   - Use Framer Motion for smooth and interactive animations across the UI.
   - Avoid heavy or resource-intensive animations unless necessary for the user experience.

---

## **Backend Setup**

1. **TypeScript-Based Backend:**  
   - The backend is built using TypeScript for type safety and scalability.
   - Follow TypeScript's best practices and adhere to its strict types system.

2. **Modular Structure:**  
   - The backend follows a modular structure with clear separation of concerns.
   - Organize files and components logically into modules.
   - Each module should ideally have its own set of routes, controllers, and services.

3. **Database Encryption/Decryption:**  
   - All sensitive data stored in the database should be encrypted for security.
   - The system must support encryption and decryption processes.
   - Use industry-standard encryption algorithms (e.g., AES) and ensure proper key management.

---

### **Additional Notes:**

- Please make sure to run the backend and frontend environments separately for development.
- For any new features or modifications, please make sure they are well-documented in the code and corresponding documentation.
