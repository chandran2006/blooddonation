# Blood Donation System - Quick Reference Guide

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
**Runs on**: http://localhost:8080
**Swagger UI**: http://localhost:8080/swagger-ui.html

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
**Runs on**: http://localhost:5173

### Database Setup
```sql
CREATE DATABASE blood_donation_db;
-- Tables auto-created by Hibernate
```

## 🔑 Default Credentials

### Admin Account
- **Secret Key**: RPHM (required during registration)
- **Email**: admin@example.com
- **Password**: Admin@123

### Test Accounts
Create via signup page with roles: DONOR, PATIENT, HOSPITAL

## 📋 API Endpoints Quick Reference

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login (returns JWT)

### Donor
- `GET /api/donor/profile` - Get profile
- `PUT /api/donor/update` - Update profile
- `GET /api/donor/requests` - All requests
- `PUT /api/donor/accept-request/{id}` - Accept request

### Patient
- `POST /api/patient/create-request` - Create request
- `GET /api/patient/my-requests` - My requests

### Hospital
- `POST /api/hospital/create-request` - Create request
- `GET /api/hospital/all-requests` - All requests
- `PUT /api/hospital/update-status/{id}?status=ACCEPTED` - Update status

### Admin
- `GET /api/admin/users` - All users
- `GET /api/admin/requests` - All requests
- `DELETE /api/admin/delete/{id}` - Delete user

### Reports
- `POST /api/reports` - Create report
- `GET /api/reports/my-reports` - My reports
- `GET /api/reports` - All reports (admin)
- `PUT /api/reports/{id}/action` - Take action (admin)

## 🎨 Frontend Routes

### Public
- `/login` - Login page
- `/signup` - Registration page

### Donor
- `/donor/dashboard` - Dashboard
- `/donor/profile` - Profile management
- `/my-reports` - View reports

### Patient
- `/patient/dashboard` - Dashboard
- `/patient/create-request` - Create request
- `/my-reports` - View reports

### Hospital
- `/hospital/dashboard` - Dashboard
- `/hospital/create-request` - Create request
- `/my-reports` - View reports

### Admin
- `/admin/dashboard` - Dashboard
- `/admin/users` - Manage users

## 🔧 Configuration Files

### Backend
- `application.properties` - Database, JWT config
- `SecurityConfig.java` - Security rules
- `pom.xml` - Dependencies

### Frontend
- `.env` - Environment variables
- `vite.config.js` - Build configuration
- `package.json` - Dependencies

## 📊 Key Features by Role

### DONOR
✅ View profile with badge system
✅ Toggle availability (90-day rule)
✅ View all blood requests
✅ Accept requests
✅ Filter by blood group
✅ Submit reports

### PATIENT
✅ Create blood requests
✅ Mark as emergency
✅ View own requests
✅ AI donor recommendations
✅ Contact donors
✅ Submit reports

### HOSPITAL
✅ Create blood requests
✅ View all requests
✅ Accept requests
✅ Blood demand analytics
✅ Submit reports

### ADMIN
✅ View all users
✅ Delete users
✅ View all requests
✅ View all reports
✅ Take action on reports
✅ System analytics

## 🛠️ Common Tasks

### Add New User
1. Go to `/signup`
2. Fill form with role
3. For admin: enter secret key "RPHM"
4. Submit

### Create Blood Request
1. Login as Patient/Hospital
2. Click "Create Request"
3. Fill form (patient name, blood group, hospital, city, urgency)
4. Submit

### Accept Request (Donor)
1. Login as Donor
2. View requests in dashboard
3. Click "Accept" on pending request
4. Request status changes to ACCEPTED

### Accept Request (Hospital)
1. Login as Hospital
2. View all requests
3. Click "Accept" on pending request
4. Request status changes to ACCEPTED

### Submit Report
1. Click "Report Issue" button
2. Select reason
3. Add description
4. Submit

### View Reports (User)
1. Click "My Reports" in sidebar
2. View all submitted reports
3. Check status and admin actions

### Manage Reports (Admin)
1. Click "View Reports" in dashboard
2. Click "Mark Resolved" for quick action
3. Or click "Details" for custom action

## 🐛 Troubleshooting

### Backend Issues
**Port 8080 already in use**
```bash
# Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Database connection error**
- Check MySQL is running
- Verify credentials in application.properties
- Ensure database exists

**JWT token expired**
- Login again to get new token
- Token expires after 24 hours

### Frontend Issues
**Port 5173 already in use**
```bash
# Kill process or use different port
npm run dev -- --port 3000
```

**API calls failing**
- Check backend is running
- Verify API_URL in services
- Check browser console for errors
- Verify JWT token in localStorage

**CORS errors**
- Ensure frontend URL in SecurityConfig CORS
- Check browser console for details

## 📝 Code Snippets

### Create New Service (Backend)
```java
@Service
@RequiredArgsConstructor
public class MyService {
    private final MyRepository repository;
    
    public List<MyEntity> getAll() {
        return repository.findAll();
    }
}
```

### Create New Component (Frontend)
```jsx
import { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    // API call
  };
  
  return <div>My Component</div>;
};

export default MyComponent;
```

### Add New API Endpoint
1. Create DTO (if needed)
2. Add method in Service
3. Add endpoint in Controller
4. Update SecurityConfig
5. Create frontend service function
6. Use in component

## 🔐 Security Notes

- JWT tokens stored in localStorage
- Passwords hashed with BCrypt
- Role-based access on all endpoints
- Admin secret key: RPHM
- CORS enabled for localhost:5173

## 📦 Dependencies

### Backend (Key)
- Spring Boot 3.2.0
- Spring Security
- JWT (jjwt 0.12.3)
- MySQL Connector
- Lombok
- Swagger/OpenAPI

### Frontend (Key)
- React 18
- React Router v6
- Axios
- Bootstrap 5
- i18next
- Bootstrap Icons

## 🎯 Performance Tips

1. Use indexes on frequently queried fields
2. Implement pagination for large datasets
3. Cache static data
4. Optimize images
5. Use lazy loading
6. Minimize bundle size
7. Use CDN for static assets

## 📞 Support

For issues or questions:
1. Check documentation
2. Review error logs
3. Check browser console
4. Verify configuration
5. Test with Postman/Swagger

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
