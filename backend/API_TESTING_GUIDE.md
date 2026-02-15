# API Testing Guide

## Sample JSON Request Bodies for Testing

### 1. Register Admin
```json
POST http://localhost:8080/api/auth/register

{
  "name": "Admin User",
  "email": "admin@blooddonation.com",
  "password": "admin123",
  "phone": "1111111111",
  "city": "New York",
  "role": "ADMIN"
}
```

### 2. Register Donor
```json
POST http://localhost:8080/api/auth/register

{
  "name": "John Donor",
  "email": "john.donor@example.com",
  "password": "donor123",
  "phone": "1234567890",
  "city": "New York",
  "role": "DONOR",
  "bloodGroup": "O+"
}
```

### 3. Register Patient
```json
POST http://localhost:8080/api/auth/register

{
  "name": "Jane Patient",
  "email": "jane.patient@example.com",
  "password": "patient123",
  "phone": "2345678901",
  "city": "Los Angeles",
  "role": "PATIENT"
}
```

### 4. Register Hospital
```json
POST http://localhost:8080/api/auth/register

{
  "name": "City Hospital Admin",
  "email": "admin@cityhospital.com",
  "password": "hospital123",
  "phone": "3456789012",
  "city": "Boston",
  "role": "HOSPITAL",
  "hospitalName": "City General Hospital",
  "licenseNumber": "LIC123456789"
}
```

### 5. Login
```json
POST http://localhost:8080/api/auth/login

{
  "email": "john.donor@example.com",
  "password": "donor123"
}
```

### 6. Update Donor Profile
```json
PUT http://localhost:8080/api/donor/update
Authorization: Bearer YOUR_TOKEN

{
  "phone": "9999999999",
  "city": "San Francisco",
  "bloodGroup": "A+",
  "lastDonationDate": "2024-01-15",
  "available": true
}
```

### 7. Create Blood Request (Patient)
```json
POST http://localhost:8080/api/patient/request
Authorization: Bearer YOUR_TOKEN

{
  "patientName": "Emergency Patient",
  "bloodGroup": "O+",
  "hospitalName": "City General Hospital",
  "city": "New York",
  "urgencyLevel": "EMERGENCY"
}
```

### 8. Create Blood Request (Hospital)
```json
POST http://localhost:8080/api/hospital/create-request
Authorization: Bearer YOUR_TOKEN

{
  "patientName": "John Smith",
  "bloodGroup": "AB+",
  "hospitalName": "City General Hospital",
  "city": "Boston",
  "urgencyLevel": "NORMAL"
}
```

---

## Testing Workflow

### Step 1: Register Users
1. Register an Admin user
2. Register a Donor user
3. Register a Patient user
4. Register a Hospital user

### Step 2: Login and Get Tokens
Login with each user and save their JWT tokens.

### Step 3: Test Donor APIs
```bash
# Get donor profile
GET http://localhost:8080/api/donor/profile
Authorization: Bearer DONOR_TOKEN

# Update donor profile
PUT http://localhost:8080/api/donor/update
Authorization: Bearer DONOR_TOKEN

# Get all blood requests
GET http://localhost:8080/api/donor/requests
Authorization: Bearer DONOR_TOKEN
```

### Step 4: Test Patient APIs
```bash
# Create blood request
POST http://localhost:8080/api/patient/request
Authorization: Bearer PATIENT_TOKEN

# Get my requests
GET http://localhost:8080/api/patient/my-requests
Authorization: Bearer PATIENT_TOKEN
```

### Step 5: Test Hospital APIs
```bash
# Create blood request
POST http://localhost:8080/api/hospital/create-request
Authorization: Bearer HOSPITAL_TOKEN

# Get all requests
GET http://localhost:8080/api/hospital/all-requests
Authorization: Bearer HOSPITAL_TOKEN
```

### Step 6: Test Admin APIs
```bash
# Get all users
GET http://localhost:8080/api/admin/users
Authorization: Bearer ADMIN_TOKEN

# Delete user
DELETE http://localhost:8080/api/admin/delete/2
Authorization: Bearer ADMIN_TOKEN
```

---

## Blood Groups Reference
- A+
- A-
- B+
- B-
- AB+
- AB-
- O+
- O-

## Urgency Levels
- NORMAL
- EMERGENCY

## Request Status
- PENDING
- ACCEPTED
- COMPLETED

## User Roles
- ADMIN
- DONOR
- PATIENT
- HOSPITAL

---

## cURL Commands for Quick Testing

### Register Donor
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Donor",
    "email": "test.donor@example.com",
    "password": "password123",
    "phone": "1234567890",
    "city": "New York",
    "role": "DONOR",
    "bloodGroup": "O+"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.donor@example.com",
    "password": "password123"
  }'
```

### Get Donor Profile
```bash
curl -X GET http://localhost:8080/api/donor/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Blood Request
```bash
curl -X POST http://localhost:8080/api/patient/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "patientName": "Emergency Patient",
    "bloodGroup": "O+",
    "hospitalName": "City Hospital",
    "city": "New York",
    "urgencyLevel": "EMERGENCY"
  }'
```

---

## Postman Collection

Import this collection into Postman for easy testing:

1. Create a new collection named "Blood Donation System"
2. Add environment variables:
   - `baseUrl`: http://localhost:8080
   - `adminToken`: (set after admin login)
   - `donorToken`: (set after donor login)
   - `patientToken`: (set after patient login)
   - `hospitalToken`: (set after hospital login)

3. Use `{{baseUrl}}` and `{{donorToken}}` in your requests

---

## Expected Response Codes

- **200 OK** - Successful GET, PUT, DELETE
- **201 Created** - Successful POST (resource created)
- **400 Bad Request** - Validation errors
- **401 Unauthorized** - Invalid credentials or missing token
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## Common Issues and Solutions

### Issue: 401 Unauthorized
**Solution:** Ensure you're including the Bearer token in the Authorization header

### Issue: 403 Forbidden
**Solution:** Check that you're using the correct role token for the endpoint

### Issue: 400 Bad Request
**Solution:** Verify all required fields are present and valid

### Issue: Connection Refused
**Solution:** Ensure the application is running on port 8080

---

## Database Verification

After testing, verify data in MySQL:

```sql
-- Check users
SELECT * FROM users;

-- Check donors
SELECT * FROM donors;

-- Check patient requests
SELECT * FROM patient_requests;

-- Check hospitals
SELECT * FROM hospitals;

-- Join query to see donor details
SELECT u.name, u.email, d.blood_group, d.available, d.total_donations
FROM users u
JOIN donors d ON u.id = d.user_id;
```
