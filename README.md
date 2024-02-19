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

- [Institute Instructor Attendance System](#institute-instructor-attendance-system)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
- [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Configuration](#configuration)
      - [Example .env file:](#example-env-file)
    - [jwt token creation](#jwt-token-creation)
  - [API Documentation](#api-documentation)
    - [Using Postman Collection](#using-postman-collection)
    - [Importing into Postman](#importing-into-postman)
    - [API Endpoints](#api-endpoints)
    - [Running](#running)
    - [Testing](#testing)
    - [Assumptions:](#assumptions)

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

#JWT
JWT_SECRET=This_is_my_secret  or prefered key
```
### jwt token creation 
need to create jwt token with payload {'insId':instructorId}  with the provided jwt secret.
replace the bearer token with the created on.


## API Documentation

### Using Postman Collection

The API documentation is available as a Postman collection. You can download it [here](./Attendance%20System.postman_collection.json).

### Importing into Postman

1. Open Postman.
2. Click on the "Import" button in the top left corner.
3. Select "Import From Link" and paste the link to the downloaded Postman collection.
4. Click "Import" to import the collection into your Postman workspace.

### API Endpoints
- **/checkIn**: Endpoint for recording instructor check-in times.
- **/checkOut**: Endpoint for recording instructor check-out times.
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
### Assumptions:

- Instructors can check in and check out at any time within the specified time frame. However, checking in or out after the current date and time is not allowed.
- Working hours can extend beyond a single day without requiring a check out, allowing for longer working hours.
- The API only accepts a check out request after a check in request, and vice versa.
Report:
- Reports cannot be generated for dates beyond the current date.
- If an instructor hasn't checked out by the report's end date, or if the check out date is after the report's end date, the report will include the working hours up to the end date.
- If the check in time is before the start date and the check out time is after the end date, the working hours are calculated from the start date.
- correspoding instructor Id need to be provided along with the from and toDate 
