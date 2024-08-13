# User Management API

This API allows for managing user profiles in a college application. Below are the routes available in this API.

## Base URL

- **Production:** `https://api.yourdomain.com`
- **Development:** `http://localhost:3000`

## Paths

### 1. Register User

- **URL:** `/api/user/signup`
- **Method:** `POST`
- **Summary:** Register a new user.
- **Description:** Registers a new user with their email, password, and profile information.
- **Request Body:**
  - **Content-Type:** `application/json`
  - **Schema:**
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword",
      "name": "John Doe",
      "department": "Computer Science",
      "college": "XYZ University",
      "phone": "+1234567890",
      "year": 3
    }
    ```
  - **Required Fields:**
    - `email`
    - `password`
    - `name`
    - `department`
    - `college`
    - `phone`
    - `year`
- **Responses:**
  - `201`: User registered successfully
  - `400`: Invalid input

### 2. Login User

- **URL:** `/api/user/login`
- **Method:** `POST`
- **Summary:** Log in a user.
- **Description:** Authenticates a user and returns a token.
- **Request Body:**
  - **Content-Type:** `application/json`
  - **Schema:**
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - **Required Fields:**
    - `email`
    - `password`
- **Responses:**
  - `200`: User logged in successfully
  - `401`: Invalid credentials

### 3. Edit User Profile

- **URL:** `/api/user/editprofile`
- **Method:** `PUT`
- **Summary:** Edit user profile.
- **Description:** Allows the user to update their profile information.
- **Request Body:**
  - **Content-Type:** `application/json`
  - **Schema:**
    ```json
    {
      "name": "John Doe",
      "department": "Computer Science",
      "college": "XYZ University",
      "phone": "+1234567890",
      "year": 3
    }
    ```
- **Responses:**
  - `200`: Profile updated successfully
  - `400`: Invalid input
  - `404`: User not found

### 4. Remove User Profile

- **URL:** `/api/user/removeprofile`
- **Method:** `POST`
- **Summary:** Remove user profile.
- **Description:** Deletes the user profile from the system.
- **Responses:**
  - `200`: Profile removed successfully
  - `404`: User not found

### 5. Get All Users (Admin Only)

- **URL:** `/api/admin/users`
- **Method:** `GET`
- **Summary:** Get all users.
- **Description:** Returns a list of all registered users. Accessible only to admin users.
- **Responses:**
  - `200`: A list of users
    - **Content-Type:** `application/json`
    - **Schema:**
      ```json
      [
        {
          "id": "1",
          "email": "user@example.com",
          "name": "John Doe",
          "department": "Computer Science",
          "college": "XYZ University",
          "phone": "+1234567890",
          "year": 3
        }
      ]
      ```
  - `403`: Forbidden
