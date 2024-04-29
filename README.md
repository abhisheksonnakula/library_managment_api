# Online Library Management System

## Overview

This project is a backend API for an Online Library Management System built using Node.js, Express, and MongoDB. The system manages books, users, and borrowing history, providing a set of RESTful API endpoints to interact with the library's data.

## Features

- **Book Management**: Add, retrieve, update, and delete books.
- **User Management**: Manage users, including librarians and members.
- **Borrowing History**: Track and manage the borrowing and return of books.
- **Authentication and Authorization**: Secured access to API endpoints for librarian-specific operations.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- Git (for version control)

### Installation and Running

```bash
git clone https://github.com/abhisheksonnakula/library_managment_api.git
cd  library_managment_api

npm install

cp .env.example .env

npm run build

npm run start

```

## API Endpoints

Below are the available API endpoints grouped by functionalities:

### Books

- **GET `/books`**
  - Description: Retrieve a list of all books.
  - Permissions: Open to all users.

- **GET `/books/:id`**
  - Description: Retrieve details of a specific book by ID.
  - Permissions: Open to all users.

- **POST `/books`**
  - Description: Add a new book to the library.
  - Permissions: Librarians only.

- **PUT `/books/:id`**
  - Description: Update details of a specific book by ID.
  - Permissions: Librarians only.

- **DELETE `/books/:id`**
  - Description: Remove a book from the library.
  - Permissions: Librarians only.

- **GET `/books/low-in-stock`**
  - Description: Retrieve a list of books with the quantity in stock less than 5..
  - Permissions: Librarians only.

### Users

- **GET `/users`**
  - Description: Retrieve all users.
  - Permissions: Librarians only.

- **GET `/users/:id`**
  - Description: Retrieve details of a specific user by ID.
  - Permissions: Librarians and Members

- **POST `/users`**
  - Description: Register a new user.
  - Permissions: Librarians only.

- **PUT `/users/:id`**
  - Description: Update user details.
  - Permissions: Librarians only.

- **DELETE `/users/:id`**
  - Description: Delete a user.
  - Permissions: Librarians only.

- **POST `/users/login`**
  - Description: Login and get Authentication Token.
  - Permissions: Open to all users.

### Borrowing History

- **GET `/borrow-history`**
  - Description: List all borrowing records.
  - Permissions: Librarians only.

- **GET `/borrow-history/:id`**
  - Description: Get details of a specific borrowing record by ID.
  - Permissions: Librarians only.

- **POST `/borrow-history`**
  - Description: Create a borrowing record when a user borrows a book.
  - Permissions: Librarians only.

- **PUT `/borrow-history/:id/return`**
  - Description: Update a borrowing record to mark a book as returned.
  - Permissions: Librarians only.

- **GET `/borrow-history/:id`**
  - Description: Get details of a specific borrowing record by ID.
  - Permissions: Librarians only.

- **GET `/users-who-borrowed-more-than-twice`**
  - Description: Retrieve a list of users who have borrowed books more than twice.
  - Permissions: Librarians only.

- **GET `/total-books-borrowed-by-each-user`**
  - Description: Calculate the total number of books borrowed by each user.
  - Permissions: Librarians only.




