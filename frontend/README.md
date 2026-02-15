# Blood Donation System - Frontend

A complete React frontend application for the Blood Donation Information System with role-based dashboards and JWT authentication.

## Technology Stack

- **React 18** (Vite)
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - UI framework
- **Bootstrap Icons** - Icon library

## Features

✅ JWT Authentication  
✅ Role-Based Routing (ADMIN, DONOR, PATIENT, HOSPITAL)  
✅ Protected Routes  
✅ Responsive Design  
✅ Dashboard with Sidebar Navigation  
✅ CRUD Operations  
✅ Real-time Data Display  
✅ Form Validation  
✅ Loading States  
✅ Error Handling  

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Top navigation bar
│   ├── Sidebar.jsx             # Role-based sidebar menu
│   └── ProtectedRoute.jsx      # Route protection component
├── pages/
│   ├── auth/
│   │   ├── Login.jsx           # Login page
│   │   └── Signup.jsx          # Registration page
│   ├── donor/
│   │   ├── DonorDashboard.jsx  # Donor dashboard
│   │   └── DonorProfile.jsx    # Donor profile management
│   ├── patient/
│   │   ├── PatientDashboard.jsx    # Patient dashboard
│   │   └── CreateRequest.jsx       # Create blood request
│   ├── hospital/
│   │   ├── HospitalDashboard.jsx   # Hospital dashboard
│   │   └── CreateHospitalRequest.jsx
│   └── admin/
│       ├── AdminDashboard.jsx      # Admin dashboard
│       └── ManageUsers.jsx         # User management
├── services/
│   ├── api.js                  # Axios instance
│   ├── authService.js          # Authentication API
│   ├── donorService.js         # Donor API
│   ├── patientService.js       # Patient API
│   ├── hospitalService.js      # Hospital API
│   └── adminService.js         # Admin API
├── routes/
│   └── AppRoutes.jsx           # Route configuration
├── App.jsx                     # Main app component
└── main.jsx                    # Entry point
```

## Installation

```bash
cd frontend
npm install
```

## Running the Application

```bash
npm run dev
```

The application will start on `http://localhost:5173`

## Backend Connection

The frontend connects to the backend API at:
```
http://localhost:8080/api
```

Ensure the backend is running before starting the frontend.

## User Roles & Routes

### DONOR
- `/donor/dashboard` - View profile stats and blood requests
- `/donor/profile` - Update profile and availability

### PATIENT
- `/patient/dashboard` - View all requests
- `/patient/create-request` - Create new blood request

### HOSPITAL
- `/hospital/dashboard` - View all blood requests
- `/hospital/create-request` - Create blood request

### ADMIN
- `/admin/dashboard` - View system statistics
- `/admin/users` - Manage all users

## Authentication Flow

1. **Login/Signup** → User enters credentials
2. **Backend Validation** → JWT token generated
3. **Token Storage** → Stored in localStorage
4. **Role-Based Redirect** → Redirected to appropriate dashboard
5. **Protected Routes** → Token validated on each request

## API Integration

All API calls use Axios interceptors to:
- Automatically attach JWT token to requests
- Handle 401 errors (redirect to login)
- Provide consistent error handling

## Sample Test Users

After backend is running, create test users:

**Donor:**
```json
{
  "email": "donor@test.com",
  "password": "password123",
  "role": "DONOR"
}
```

**Patient:**
```json
{
  "email": "patient@test.com",
  "password": "password123",
  "role": "PATIENT"
}
```

**Hospital:**
```json
{
  "email": "hospital@test.com",
  "password": "password123",
  "role": "HOSPITAL"
}
```

**Admin:**
```json
{
  "email": "admin@test.com",
  "password": "password123",
  "role": "ADMIN"
}
```

## Features by Role

### Donor Features
- View personal profile with blood group
- Update availability status
- View donation history
- See nearby blood requests
- Update last donation date

### Patient Features
- Create blood requests
- View own requests
- Track request status
- Specify urgency level

### Hospital Features
- Create bulk blood requests
- View all system requests
- Manage hospital requests
- Track request statistics

### Admin Features
- View all users
- Delete users
- View system statistics
- Monitor user distribution

## UI Components

### Navbar
- Displays user email and role
- Logout button
- Responsive design

### Sidebar
- Role-based menu items
- Active route highlighting
- Icon-based navigation

### Dashboard Cards
- Statistics display
- Color-coded by type
- Real-time data

### Tables
- Responsive design
- Sortable columns
- Action buttons
- Status badges

## Error Handling

- Form validation errors displayed inline
- API errors shown in alerts
- 401 errors redirect to login
- Network errors handled gracefully

## Styling

- Bootstrap 5 for layout and components
- Custom color scheme (Red theme for blood donation)
- Responsive design for mobile/tablet/desktop
- Bootstrap Icons for consistent iconography

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Environment Variables

Create `.env` file if needed:
```
VITE_API_URL=http://localhost:8080/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Issue: Cannot connect to backend
**Solution:** Ensure backend is running on port 8080

### Issue: 401 Unauthorized
**Solution:** Clear localStorage and login again

### Issue: CORS errors
**Solution:** Backend CORS is configured for localhost:5173

## Development Tips

1. Keep backend running while developing
2. Use React DevTools for debugging
3. Check browser console for errors
4. Test with different user roles

## License

Educational project for Blood Donation System.
