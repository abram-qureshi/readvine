# ReadVine Frontend

Welcome to the **ReadVine** frontend! This is the user interface of ReadVine, a platform that helps users share and exchange books with others in the community.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Login, logout, registration, and password reset.
- **Profile Management**: Users can manage their own profiles.
- **Book Management**: View, search, add, edit, and delete books.
- **Community Engagement**: Lend or exchange books with other users.

## Tech Stack

- **React.js**: The main JavaScript library for building the user interface.
- **React Router**: Used for routing between different pages.
- **Axios**: For making API requests to the backend.
- **CSS Modules**: Used for styling the components.

## Getting Started

### Prerequisites

To set up the project locally, you will need:

- **Node.js** and **npm** (or **yarn**) installed.
- **Git** to clone the repository.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/abram-qureshi/readvine.git
   cd readvine/frontend
   ```

2. **Install Dependencies**:

   Run the following command to install all required dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Running the Application

To start the development server:

```bash
npm start
```

or

```bash
yarn start
```

The application will run at `http://localhost:3000`.

## Project Structure

```bash
frontend/
├── public/                # Public assets
├── src/                   # Source files for the project
│   ├── components/        # Reusable UI components (e.g., BookCard, Navbar)
│   ├── pages/             # Page-level components (LoginPage, RegisterPage, ProfilePage)
│   ├── context/           # Context API for managing authentication state
│   ├── services/          # API utility functions (e.g., Axios configuration)
│   ├── styles/            # CSS files for styling components and pages
│   └── App.js             # Main application component
├── .env.example           # Example environment configuration
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```

## Environment Variables

To run the project, you need to configure some environment variables.

Create a `.env` file in the `frontend` directory, and add the following variables:

```env
REACT_APP_BACKEND_URL=http://localhost:8000/api
```

Make sure to replace `http://localhost:8000/api` with the URL of your backend server if it’s different.

## Contributing

We welcome contributions! Follow these steps to contribute:

1. **Fork the repository**.
2. **Create a new branch** (`git checkout -b feature-branch-name`).
3. **Make your changes** and **commit** them (`git commit -m 'Add new feature'`).
4. **Push to the branch** (`git push origin feature-branch-name`).
5. **Open a pull request**.

Before contributing, ensure your code follows the project's coding standards and that you have tested any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for more information.

## Additional Notes

### Files to Add or Remove

- **Add `.env` File**: Include environment configuration as explained in [Environment Variables](#environment-variables).
- **Remove `node_modules`**: The `node_modules` directory should be ignored by using `.gitignore`.
- **Include `.gitignore`**: Make sure to ignore unnecessary files like `node_modules`, `.env`, `.DS_Store`, etc.

