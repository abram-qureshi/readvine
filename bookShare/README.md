# ReadVine Backend

Welcome to the **ReadVine** backend! This is the API and data management part of ReadVine, a platform that helps users share and exchange books with others in the community. This backend is built using **Django REST Framework** and provides the necessary endpoints to manage user accounts, books, authentication, and more.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Registration and Authentication** (Login, Logout, Password Reset)
- **JWT Authentication** for secure API access
- **CRUD Operations** for managing books
- **Admin Panel** for managing users and books

## Tech Stack
- **Backend Framework**: Django, Django REST Framework
- **Database**: PostgreSQL (can be used with SQLite for local development)
- **Authentication**: JWT (JSON Web Tokens)
- **Other Tools**: SMTP for sending emails (e.g., password recovery)

## Getting Started

### Prerequisites

To set up and run the project locally, you will need:
- Python 3.x and pip
- PostgreSQL (for production) or SQLite (for development)
- Git

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/abram-qureshi/readvine.git
   cd readvine/bookShare
   ```

2. **Create and Activate a Virtual Environment**:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up the Database**:
   - Apply migrations:
     ```bash
     python manage.py migrate
     ```
   - Create a superuser to access the Django admin panel:
     ```bash
     python manage.py createsuperuser
     ```

### Running the Server

To run the Django development server:
```bash
python manage.py runserver
```
The server will be running at `http://localhost:8000`.

## Project Structure

```bash
bookShare/
├── users/                # User management app
├── books/                # Book management app
├── bookShare/            # Main project settings
├── templates/            # HTML templates (for password reset emails, etc.)
├── manage.py             # Django management script
├── requirements.txt      # Project dependencies
└── README.md             # This file
```

## Environment Variables
To run the project, you need to configure some environment variables. Create a `.env` file in the `bookShare` directory and add the following variables:

```env
SECRET_KEY='your_secret_key_here'
DEBUG=True
DATABASE_URL=postgres://user:password@localhost:5432/yourdbname
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@example.com
EMAIL_HOST_PASSWORD=your_email_password
EMAIL_USE_TLS=True
```
Make sure to replace the placeholders with your actual credentials.

## API Endpoints

- **User Endpoints**:
  - `POST /api/users/register/` - Register a new user.
  - `POST /api/users/login/` - Log in an existing user.
  - `POST /api/users/logout/` - Log out the user.
  - `POST /api/users/recover-password/` - Send password recovery email.
  - `POST /api/users/reset-password/:uid/:token/` - Reset password.
  - `GET /api/users/profile/` - Retrieve user profile.
  - `PUT /api/users/profile/` - Update user profile.

- **Book Endpoints**:
  - `GET /api/books/` - List all books.
  - `POST /api/books/` - Add a new book.
  - `GET /api/books/:bookId/` - Retrieve details for a specific book.
  - `PUT /api/books/:bookId/` - Update a book (owner only).
  - `DELETE /api/books/:bookId/` - Delete a book (owner only).

## Contributing
We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request.

Before contributing, ensure your code follows the project's coding standards and that you have tested any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for more information.

## Additional Notes

### Files to Add or Remove
- **Add `.env` File**: Include environment configuration as explained in [Environment Variables](#environment-variables).
- **Remove `__pycache__`**: Make sure any `__pycache__` folders are ignored by using `.gitignore`.
- **Include `.gitignore`**: To ignore unnecessary files like `__pycache__`, `.env`, `.DS_Store`, etc.

## requirements.txt
Here is a sample `requirements.txt` file that should cover the dependencies required for this project:

```
Django>=3.2,<4.0
djangorestframework>=3.12
psycopg2-binary>=2.9  # For PostgreSQL database
python-dotenv>=0.19  # For environment variables management
PyJWT>=2.0
```
Make sure to install the above dependencies using `pip install -r requirements.txt`.

