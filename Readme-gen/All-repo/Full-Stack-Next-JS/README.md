# Project Name : [NextJS Authentication](https://nextauth-git-main-shardendu-mishra.vercel.app/)

## Project Overview

This project aims to demonstrate the integration of front-end and back-end systems using Next.js. It focuses on understanding how to connect and manage interactions between the client and server, providing a cohesive full-stack development experience.

## Technologies

### 1. [Next.js](https://nextjs.org/docs) <img src="https://imgs.search.brave.com/cNXOQASCVcXa9DgMXHAZT_XT9mxhzj9Entmew9KqBbw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmxvZ3JvY2tldC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjMvMDEvaW1wb3J0/LXN2Z3MtbmV4dC1q/cy1hcHAucG5n" alt="Next.js Icon" width="40" height="40" />
Next.js is a React framework that enables functionality such as server-side rendering and static site generation for building fast and scalable applications.

### 2. [Atlas](https://www.mongodb.com/docs/atlas/) <img src="https://www.svgrepo.com/show/331488/mongodb.svg" alt="MongoDB Atlas Icon" width="40" height="40" />
MongoDB Atlas is a fully-managed cloud database that provides advanced tools and infrastructure to work with MongoDB at scale.

### 3. [TypeScript](https://www.typescriptlang.org/docs/) <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript Icon" width="40" height="40" />  
TypeScript is a statically-typed superset of JavaScript that compiles to plain JavaScript, helping developers catch errors early and write more maintainable code.

### 4. [Tailwind CSS](https://tailwindcss.com/docs)  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS Icon" width="40" height="40" />  
Tailwind CSS is a utility-first CSS framework that allows you to style your application directly in your HTML by applying pre-built CSS classes.

### 5. [Shadcn](https://ui.shadcn.com/)  <img src="https://imgs.search.brave.com/cGAkMK54R_H7XYvEKluzNMLMDEjHUYXzE3Ovb5O3g9c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naXRo/dWIuY29tL3JheWNh/c3QvZXh0ZW5zaW9u/cy9ibG9iL2U3NTVi/MGYyZmRiZTQzNDBi/NmVlNjg1YWFjZDU4/N2RhNThiNzcyNTIv/ZXh0ZW5zaW9ucy9z/aGFkY24tdWkvYXNz/ZXRzL2V4dGVuc2lv/bi1pY29uLnBuZz9y/YXc9dHJ1ZQ" alt="Shadcn Icon" width="40" height="40" />  
Shadcn provides a customizable UI component library built with Radix Primitives and Tailwind CSS to offer easily adjustable design components for web applications.



# AuthNextJS API with Postman

This repository demonstrates a simple user authentication system built with **Next.js**, featuring user registration, login, logout, and email verification using **Postman** for API testing.

## Features

- **User Registration**: Allows users to sign up with a username, email, and password.
- **User Login**: Authenticates users and returns success message upon login.
- **Logout**: Logs out the user, terminating the session.
- **Email Verification**: Verifies user email addresses after signup.

## Tools Used

- **Next.js**: For building the API backend.
- **Postman**: Used for testing all API endpoints.

## API Endpoints

Here’s a list of the main API routes tested in Postman:

# API Documentation

## POST `/api/users/signup`
- **Description**: Registers a new user.

- **Example Request Body**:
  ```json
  {
    "username": "exampleUser",
    "email": "example@example.com",
    "password": "yourPassword"
  }

## POST /api/users/login
- **Description**: Login a new user.
- **Example Request Body**:
  ```json
  {
    "email": "example@example.com",
    "password": "yourPassword"
  }

- **Result :** 
  ```json
    {
      "message": "Login Successful",
      "success": true
    }


## GET /api/users/logout
- **Description**: Logs out the currently authenticated user.
- **Result**:
  ``` json
    {
      "message": "Logout Successful",
      "success": true
    }
