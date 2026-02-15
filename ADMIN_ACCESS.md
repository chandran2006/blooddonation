# 🔐 Admin Access Configuration

## Admin Secret Key

**Secret Key:** `RPHM`

### How to Create Admin Account

1. Go to Signup page
2. Fill in the registration form
3. Select **Role: Admin**
4. Enter the admin secret key: `RPHM`
5. Complete registration

### Security Features

✅ Admin secret key required for admin registration
✅ Key validation before account creation
✅ Error message for invalid key
✅ Password-masked input field

### Admin Privileges

Once logged in as admin, you can:
- View all users
- Delete users
- Access system analytics
- View blood demand statistics
- Monitor system health
- Track all requests

### Changing the Secret Key

To change the admin secret key:

1. Open: `frontend/src/pages/auth/Signup.jsx`
2. Find line: `if (formData.role === 'ADMIN' && formData.adminSecretKey !== 'RPHM')`
3. Replace `'RPHM'` with your new secret key
4. Save and rebuild the application

### Best Practices

- Keep the secret key confidential
- Change the key periodically
- Use a strong, unique key in production
- Store the key securely
- Don't commit the key to version control

### Production Recommendations

For production deployment:
1. Use environment variables for the secret key
2. Implement key rotation
3. Add rate limiting for failed attempts
4. Log admin registration attempts
5. Enable 2FA for admin accounts

---

**Current Secret Key:** `RPHM`
**Status:** Active
**Last Updated:** 2024
