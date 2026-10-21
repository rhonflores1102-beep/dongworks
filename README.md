# Dongworkx Motor Shop Appointment Management System

This project is a full-stack appointment management web application for Dongworkx Motor Shop. It includes:

- Customer registration and login
- Service catalog and online booking
- Appointment tracking for customers
- Staff/admin dashboard with appointment management
- Service management and user management
- Responsive Bootstrap-based UI

## Stack

- Frontend: HTML5, CSS3, JavaScript, Bootstrap 5, EJS
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose (with a demo in-memory fallback if MongoDB is unavailable)
- Authentication: Session-based auth with role handling

## Quick start

1. Install Node.js and npm if not already available.
2. Open the project folder.
3. Run:

```bash
npm install
npm start
```

The app will run at http://localhost:3000.

## Demo credentials

### Admin
- Email: admin@dongworkx.com
- Password: admin123

### Customer
- Email: customer@dongworkx.com
- Password: customer123

## Notes

- - Appointment, service, and user records use MongoDB when `MONGODB_URI` is available. If MongoDB cannot be reached, the app starts with demo data held in memory; changes in this fallback mode do not survive a process restart.
- Set `MONGODB_URI` to a persistent MongoDB database to retain changes across restarts. Existing appointment records remain available, while new bookings save their service price at booking time and schedule changes are retained in appointment history.
- Authorized staff can manage appointment statuses, decline with a recorded reason, reschedule with conflict checks, and print the current appointment record.
- The application intentionally uses placeholder contact details and business hours until verified shop information becomes available.
