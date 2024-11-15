# ReadVine

Welcome to **ReadVine**! 📚 A community-driven platform where users can exchange or lend books with each other in a convenient and user-friendly way.

## Overview

ReadVine is designed for book lovers who want to share their books with the community. Users can create book listings, offer books for lending or exchange, and search for books based on availability, location, and more.

### Features

- **User Authentication**: Sign up, log in, and recover your password easily.
- **Book Listings**: Users can add, edit, delete, or display books available for exchange or lending.
- **Book Search**: Search and filter books by title, author, genre, availability, and location.
- **Profile Management**: Each user has a profile that includes their listed books.

## Tech Stack

- **Frontend**: Vue.js for a responsive, interactive user interface.
- **Backend**: Django REST framework for building the API, handling user authentication, and managing data.
- **Database**: PostgreSQL for reliable storage of users, books, and transactions.
- **Authentication**: Uses JWT tokens for secure authentication and user management.

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Python (version 3.8+)
- Node.js and npm
- PostgreSQL
- Git

### Backend Setup

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/abram-qureshi/readvine.git
    cd readvine
    ```

2. **Create and Activate a Virtual Environment**:

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install Requirements**:

    ```sh
    pip install -r requirements.txt
    ```

4. **Set Up Environment Variables**:

    Create a `.env` file in the `readvine` directory:

Contact me for the env file

5. **Run Migrations**:

    ```sh
    python manage.py migrate
    ```

6. **Run the Development Server**:

    ```sh
    python manage.py runserver
    ```

### Frontend Setup

1. **Navigate to the Frontend Directory**:

    ```sh
    cd frontend
    ```

2. **Install Dependencies**:

    ```sh
    npm install
    ```

3. **Run the Development Server**:

    ```sh
    npm run serve
    ```

## Usage

- Visit `http://localhost:8000` for the backend API.
- The frontend will be accessible at `http://localhost:8080`.
- Register as a user to start adding and searching for books.

## API Endpoints

Here are some of the key API endpoints:

- **Authentication**:
  - `/api/auth/register/` - Register a new user.
  - `/api/auth/login/` - Obtain JWT token.
- **Books**:
  - `/api/books/` - List, add, update, or delete books.
  - `/api/books/<id>/` - Get specific book details.
  
Refer to the API documentation for more details.

## Contributing

We welcome contributions from the community! 🚀

1. **Fork the Repository**.
2. **Create a Feature Branch**:

    ```sh
    git checkout -b feature/YourFeature
    ```

3. **Commit Changes**:

    ```sh
    git commit -m "Add your feature description here"
    ```

4. **Push to Your Branch**:

    ```sh
    git push origin feature/YourFeature
    ```

5. **Create a Pull Request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Feel free to reach out:

- **GitHub**: [abram-qureshi](https://github.com/abram-qureshi)
- **Email**: 2023tm93737@wilp.bits-pilani.ac.in


Happy sharing! 📚✨
