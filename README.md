# TaskMate

A robust RESTful API for team collaboration and management, built with Node.js and Express.js. TaskMate enables users to create, join, and manage teams securely, with features like user authentication, OTP verification, and comprehensive team operations.

## Features

- **User Authentication**: Secure signup, login, logout, and password reset functionalities.
- **OTP Verification**: Send and verify OTP for enhanced security during password resets.
- **Team Management**: Create, update, delete, search, and join teams with unique keys.
- **Role-Based Access**: Admin and user roles for team management.
- **Logging**: Comprehensive logging using Winston for monitoring and debugging.
- **Email Notifications**: Integrated nodemailer for sending OTP and notifications.
- **Security**: JWT-based authentication, bcrypt password hashing, and CORS configuration.
- **Code Quality**: ESLint and Prettier for consistent code formatting and linting.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Email**: Nodemailer
- **Logging**: Winston
- **Validation**: Custom validators
- **Development Tools**: ESLint, Prettier, Husky, Nodemon

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- npm or yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iamshubhamratra/taskmate.git
   cd taskmate
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see Environment Variables section below).

4. Ensure MongoDB is running on your system or update the connection string accordingly.

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Server Configuration
SERVERPORT=8080
ORIGIN_URL=http://localhost:8080
CLIENT_URL=http://localhost:3000  # Frontend URL for CORS

# Database
MONGODB_URI=mongodb://localhost:27017/taskmate  # Or your MongoDB Atlas URI

# JWT
JWT_SECRET=your_jwt_secret_key_here #will add it later

# Email Configuration (for nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Other
NODE_ENV=development
```

**Security Note**: Never commit your `.env` file to version control. Add it to `.gitignore`.

## Running the Application

### Development Mode

Run the application with automatic restarts on file changes:

```bash
npm run dev
```

### Production Mode

Build and start the application:

```bash
npm start
```

The server will start on the port specified in `SERVERPORT` (default: 8080). You can access the API at `http://localhost:8080/taskmate`.

### Additional Scripts

- `npm run lint`: Lint and fix code with ESLint.
- `npm run format`: Format code with Prettier.
- `npm run check`: Run both linting and formatting.

## API Documentation

Base URL: `http://localhost:8080/taskmate`

All responses follow this structure:

```json
{
  "status": "success" | "error",
  "message": "Description of the response",
  "data": {}  // Optional data object
}
```

### Authentication Endpoints

#### Signup

- **Endpoint**: `POST /taskmate/auth/signup`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "User created successfully <username>",
    "data": {
      /* user data */
    }
  }
  ```

#### Login

- **Endpoint**: `POST /taskmate/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "User logged in successfully <username>",
    "data": {
      /* user data with token */
    }
  }
  ```

#### Logout

- **Endpoint**: `POST /taskmate/auth/logout`
- **Response**:
  ```json
  {
    "status": "success",
    "message": "User logged out successfully <username>"
  }
  ```

#### Reset Password

- **Endpoint**: `PUT /taskmate/auth/reset-password`
- **Body**:
  ```json
  {
    "oldPassword": "oldpassword",
    "newPassword": "newpassword"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Password changed successfully <username>",
    "data": {
      /* updated user data */
    }
  }
  ```

#### Set New Password (Forget Password)

- **Endpoint**: `PATCH /taskmate/auth/set-new-password`
- **Body**:
  ```json
  {
    "resetToken": "token_from_email",
    "newPassword": "newpassword"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Password reset successfully"
  }
  ```

### OTP Endpoints

#### Send OTP

- **Endpoint**: `POST /taskmate/otp/send-otp`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "mobile": "1234567890"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "OTP sent successfully"
  }
  ```

#### Verify OTP

- **Endpoint**: `POST /taskmate/otp/verify-otp`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "OTP verified successfully"
  }
  ```

### Team Endpoints

**Note**: All team endpoints require authentication (JWT token in header).

#### List All Teams (Available to Join)

- **Endpoint**: `GET /taskmate/team/list-all-teams`
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Teams fetched successfully",
    "data": [
      {
        "teamName": "Team Alpha",
        "teamDescription": "Description",
        "teamPhoto": "url",
        "adminName": "Admin User",
        "totalMembers": 5
      }
    ]
  }
  ```

#### Create Team

- **Endpoint**: `POST /taskmate/team/createTeam`
- **Body**:
  ```json
  {
    "teamName": "New Team",
    "teamDescription": "Optional description",
    "teamPhoto": "Optional photo URL"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Team created successfully",
    "data": {
      "teamName": "New Team",
      "teamKey": "unique-key"
    }
  }
  ```

#### Update Team

- **Endpoint**: `PUT /taskmate/team/updateTeam`
- **Body**:
  ```json
  {
    "teamName": "Updated Team Name",
    "teamDescription": "Updated description",
    "teamPhoto": "Updated photo URL"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Team updated successfully",
    "data": {
      "teamName": "Updated Team Name",
      "teamKey": "same-unique-key"
    }
  }
  ```

#### Delete Team

- **Endpoint**: `DELETE /taskmate/team/deleteTeam`
- **Body**:
  ```json
  {
    "teamName": "Team to Delete"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Team deleted successfully"
  }
  ```

#### Search Team

- **Endpoint**: `POST /taskmate/team/searchTeam`
- **Body**:
  ```json
  {
    "teamKey": "unique-team-key"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Team found",
    "data": {
      "teamName": "Team Name",
      "teamDescription": "Description",
      "teamPhoto": "url",
      "adminName": "Admin User",
      "totalMembers": 5
    }
  }
  ```

#### Join Team

- **Endpoint**: `POST /taskmate/team/join-team`
- **Body**:
  ```json
  {
    "teamKey": "unique-team-key"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Joined team successfully"
  }
  ```

#### Leave Team

- **Endpoint**: `POST /taskmate/team/leave-team`
- **Body**:
  ```json
  {
    "teamName": "Team Name"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Left team successfully"
  }
  ```

#### List My Teams (Admin)

- **Endpoint**: `GET /taskmate/team/list-my-teams`
- **Response**:
  ```json
  {
    "status": "success",
    "message": "My teams fetched successfully",
    "data": [
      {
        "teamName": "My Team",
        "teamDescription": "Description",
        "teamPhoto": "url",
        "adminName": "Your Name",
        "totalMembers": 3
      }
    ]
  }
  ```

#### List Joined Teams

- **Endpoint**: `GET /taskmate/team/list-joined-teams`
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Joined teams fetched successfully",
    "data": [
      /* similar to above */
    ]
  }
  ```

## Models

### User Model

- `id`: MongoDB ObjectId (auto-generated)
- `email`: String, unique
- `username`: String
- `password`: String (hashed)
- `role`: Enum ('admin', 'user')

### Team Model

- `id`: MongoDB ObjectId (auto-generated)
- `teamName`: String
- `teamDescription`: String (optional)
- `teamPhoto`: String (optional)
- `teamKey`: String (unique)
- `admin`: User ObjectId
- `members`: Array of User ObjectIds

### OTP Model

- `id`: MongoDB ObjectId (auto-generated)
- `email`: String
- `otp`: String
- `expiresAt`: Date

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

Please ensure your code follows the project's linting and formatting standards by running `npm run check` before submitting.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author

Developed by [Shubham Ratra](https://github.com/iamshubhamratra)
&  
Developed by [Kartik Bhatt ](https://github.com/ikartikbhatt)
