# Institute Instructor Attendance System

The Institute Instructor Attendance System is a backend application built using Node.js and Express framework. 
It allows institutes to efficiently track their instructors' attendance by providing APIs for recording check-in and check-out times. 
The system ensures data integrity and offers aggregated reports based on specified date ranges.

## Features
- **Check-In/Check-Out Management**: APIs to record and validate instructors' attendance time & dates.
- **Custom Reports**: Generate aggregated reports based on specified date ranges.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB**
- **Jest (for testing)**

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [API Documentation](#APIDocumentation)
  - [Running](#running)
  - [Testing](#testing)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/JEFINJOJOTHOTTS/AttendanceSystem.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd AttendanceSystem
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```
    
## Usage

### Configuration

To configure your project, create a `.env` file in the root directory of the project and add the following environment variables:

#### Example .env file:

```plaintext
# Server Configuration
PORT="3000"

# Database Connection
DATABASE_URL="mongodb://127.0.0.1:27017/ProAttendance"
or run on mongodb atlas -provide url;
```
## API Documentation

### Using Postman Collection

The API documentation is available as a Postman collection. You can download it [here](./Attendance%20System.postman_collection.json).

### Importing into Postman

1. Open Postman.
2. Click on the "Import" button in the top left corner.
3. Select "Import From Link" and paste the link to the downloaded Postman collection.
4. Click "Import" to import the collection into your Postman workspace.

### API Endpoints
- **/in**: Endpoint for recording instructor check-in times.
- **/out**: Endpoint for recording instructor check-out times.
- **/**: Endpoint for generating attendance reports.

### Running

To run the Institute Instructor Attendance System:

```bash
nodemon app.js
```
### Testing

Unit testing is only provided for 'checkOverlap' method in the Institute Instructor Attendance System usning Jest, for testing:

```bash
npx jest
```