# Blood Donation Information System - Backend

A complete production-ready Spring Boot 3 backend application for managing blood donation information with JWT authentication and role-based access control.

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT Authentication
- **Spring Data JPA**
- **MySQL 8**
- **Lombok**
- **Swagger/OpenAPI 3**
- **Maven**

## Architecture

The project follows a clean layered architecture:

```
src/main/java/com/blooddonation/system/
├── controller/          # REST Controllers
├── service/            # Business Logic
├── repository/         # Data Access Layer
├── entity/             # JPA Entities
├── dto/                # Data Transfer Objects
├── security/           # JWT & Security Components
├── config/             # Configuration Classes
├── exception/          # Exception Handling
└── BloodDonationSystemApplication.java
```

## Database Configuration

**Database Name:** `blood_donation_db`  
**Username:** `root`  
**Password:** `Chandran@2006`

The application will automatically create the database and tables on startup.

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

### Steps

1. **Clone the repository**
```bash
cd backend
```

2. **Ensure MySQL is running**
```bash
# Start MySQL service
# Windows: net start MySQL80
# Linux: sudo systemctl start mysql
```

3. **Build the project**
```bash
mvn clean install
```

4. **Run the application**
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Documentation

### Swagger UI
Access interactive API documentation at:
```
http://localhost:8080/swagger-ui/index.html
```

### Base URL
```
http://localhost:8080/api
```

---

## API Endpoints

### 1. Authentication APIs

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "city": "New York",
  "role": "DONOR",
  "bloodGroup": "O+"
}
```

**Roles:** `ADMIN`, `DONOR`, `PATIENT`, `HOSPITAL`

**For DONOR registration:**
```json
{
  "name": "John Donor",
  "email": "donor@example.com",
  "password": "password123",
  "phone": "1234567890",
  "city": "New York",
  "role": "DONOR",
  "bloodGroup": "A+"
}
```

**For HOSPITAL registration:**
```json
{
  "name": "City Hospital",
  "email": "hospital@example.com",
  "password": "password123",
  "phone": "9876543210",
  "city": "Boston",
  "role": "HOSPITAL",
  "hospitalName": "City General Hospital",
  "licenseNumber": "LIC123456"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "john@example.com",
  "role": "DONOR",
  "message": "Registration successful"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "john@example.com",
  "role": "DONOR",
  "message": "Login successful"
}
```

---

### 2. Donor APIs

**Authentication Required:** Bearer Token  
**Role Required:** DONOR

#### Get Donor Profile
```http
GET /api/donor/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "city": "New York",
  "bloodGroup": "O+",
  "lastDonationDate": "2024-01-15",
  "available": true,
  "totalDonations": 5
}
```

#### Update Donor Profile
```http
PUT /api/donor/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "phone": "9999999999",
  "city": "Los Angeles",
  "bloodGroup": "A+",
  "lastDonationDate": "2024-02-01",
  "available": true
}
```

#### Get All Blood Requests
```http
GET /api/donor/requests
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "patientName": "Jane Smith",
    "bloodGroup": "O+",
    "hospitalName": "City Hospital",
    "city": "New York",
    "urgencyLevel": "EMERGENCY",
    "requestDate": "2024-01-20T10:30:00",
    "status": "PENDING",
    "createdByEmail": "patient@example.com"
  }
]
```

---

### 3. Patient APIs

**Authentication Required:** Bearer Token  
**Role Required:** PATIENT

#### Create Blood Request
```http
POST /api/patient/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientName": "Jane Smith",
  "bloodGroup": "O+",
  "hospitalName": "City Hospital",
  "city": "New York",
  "urgencyLevel": "EMERGENCY"
}
```

**Urgency Levels:** `NORMAL`, `EMERGENCY`

**Response:**
```json
{
  "id": 1,
  "patientName": "Jane Smith",
  "bloodGroup": "O+",
  "hospitalName": "City Hospital",
  "city": "New York",
  "urgencyLevel": "EMERGENCY",
  "requestDate": "2024-01-20T10:30:00",
  "status": "PENDING",
  "createdByEmail": "patient@example.com"
}
```

#### Get My Requests
```http
GET /api/patient/my-requests
Authorization: Bearer <token>
```

---

### 4. Hospital APIs

**Authentication Required:** Bearer Token  
**Role Required:** HOSPITAL

#### Create Blood Request
```http
POST /api/hospital/create-request
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientName": "John Patient",
  "bloodGroup": "AB+",
  "hospitalName": "City General Hospital",
  "city": "Boston",
  "urgencyLevel": "NORMAL"
}
```

#### Get All Requests
```http
GET /api/hospital/all-requests
Authorization: Bearer <token>
```

---

### 5. Admin APIs

**Authentication Required:** Bearer Token  
**Role Required:** ADMIN

#### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "city": "New York",
    "role": "DONOR",
    "enabled": true
  }
]
```

#### Delete User
```http
DELETE /api/admin/delete/1
Authorization: Bearer <token>
```

**Response:**
```
User deleted successfully
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    city VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE
);
```

### Donors Table
```sql
CREATE TABLE donors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNIQUE NOT NULL,
    blood_group VARCHAR(10) NOT NULL,
    last_donation_date DATE,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    total_donations INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Patient Requests Table
```sql
CREATE TABLE patient_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    patient_name VARCHAR(255) NOT NULL,
    blood_group VARCHAR(10) NOT NULL,
    hospital_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    urgency_level VARCHAR(50) NOT NULL,
    request_date DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_by BIGINT NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

### Hospitals Table
```sql
CREATE TABLE hospitals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNIQUE NOT NULL,
    hospital_name VARCHAR(255) NOT NULL,
    license_number VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## Security Features

- **JWT Authentication** - Stateless token-based authentication
- **BCrypt Password Encoding** - Secure password hashing
- **Role-Based Access Control** - Endpoint protection by user roles
- **CORS Configuration** - Configured for frontend at `http://localhost:5173`
- **Global Exception Handling** - Consistent error responses

---

## Testing with Postman/cURL

### 1. Register a Donor
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Donor",
    "email": "donor@test.com",
    "password": "password123",
    "phone": "1234567890",
    "city": "New York",
    "role": "DONOR",
    "bloodGroup": "O+"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "donor@test.com",
    "password": "password123"
  }'
```

### 3. Access Protected Endpoint
```bash
curl -X GET http://localhost:8080/api/donor/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Error Handling

The application provides consistent error responses:

```json
{
  "timestamp": "2024-01-20T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "User not found",
  "path": "/api/donor/profile"
}
```

**Common HTTP Status Codes:**
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Authentication failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/blooddonation/system/
│   │   │   ├── controller/
│   │   │   │   ├── AdminController.java
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── DonorController.java
│   │   │   │   ├── HospitalController.java
│   │   │   │   └── PatientController.java
│   │   │   ├── service/
│   │   │   │   ├── AdminService.java
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── DonorService.java
│   │   │   │   ├── HospitalService.java
│   │   │   │   └── PatientService.java
│   │   │   ├── repository/
│   │   │   │   ├── DonorRepository.java
│   │   │   │   ├── HospitalRepository.java
│   │   │   │   ├── PatientRequestRepository.java
│   │   │   │   └── UserRepository.java
│   │   │   ├── entity/
│   │   │   │   ├── Donor.java
│   │   │   │   ├── Hospital.java
│   │   │   │   ├── PatientRequest.java
│   │   │   │   └── User.java
│   │   │   ├── dto/
│   │   │   │   ├── AuthResponse.java
│   │   │   │   ├── DonorDTO.java
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── PatientRequestDTO.java
│   │   │   │   ├── RegisterRequest.java
│   │   │   │   ├── UpdateDonorRequest.java
│   │   │   │   └── UserDTO.java
│   │   │   ├── security/
│   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── JwtUtil.java
│   │   │   ├── config/
│   │   │   │   ├── OpenApiConfig.java
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── exception/
│   │   │   │   ├── BadRequestException.java
│   │   │   │   ├── ErrorResponse.java
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   └── BloodDonationSystemApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

---

## Features

✅ Complete JWT Authentication  
✅ Role-Based Access Control (ADMIN, DONOR, PATIENT, HOSPITAL)  
✅ RESTful API Design  
✅ Global Exception Handling  
✅ Input Validation  
✅ Swagger/OpenAPI Documentation  
✅ CORS Configuration  
✅ MySQL Database Integration  
✅ Layered Architecture  
✅ Production-Ready Code  

---

## License

This project is created for educational purposes.

---

## Support

For issues or questions, please check the Swagger documentation at:
```
http://localhost:8080/swagger-ui/index.html
```
