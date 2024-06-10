# Expense Tracker App - Front End

This repository contains the front-end code for the Expense Tracker App, a school project for the Database Systems course (ISE 305) at Istanbul Technical University.

## Project Overview

The Expense Tracker App is a full-stack application designed to help users track their daily expenses and view monthly spending summaries. The project consists of two main parts:
- **Backend**: Developed with Spring Boot
- **Frontend**: Developed with React

## Course Information

- **Course**: Database Systems (ISE 305)
- **Institution**: Istanbul Technical University

## Project Description

You are expected to choose a topic, analyze the problem, the data, and the relationships of the data regarding the problem. Then you need to generate the normalized data model, implement the model in any relational database management system you choose, and develop an application that makes use of this database. You can use any programming language you want, with the limitation that you are not allowed to use any ORM framework.

### Project Requirements

- **Minimum Tables**: 8-10 tables should exist in the final database schema.
- **Submission Requirements**:
  - Project Report
  - Source Codes
  - Database Dump (SQL Export)

## Project Components

### Frontend

- **Technologies**: React, Axios, Chart.js, React DatePicker
- **Features**:
  - Add, view, and manage expenses
  - Add, view, and manage incomes
  - Add, view, and manage payment methods
  - Calculate and display expense summaries
  - Interactive charts for visualizing expenses

### Backend

- **Technologies**: Spring Boot, JDBC
- **Features**:
  - RESTful API endpoints for managing users, expenses, incomes, and payment methods
  - Data persistence in a relational database without using any ORM framework

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Backend server running (Spring Boot application)

### Running the Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/expense-tracker-app-front-end.git
    ```

2. Navigate to the project directory:
    ```bash
    cd expense-tracker-app-front-end
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
