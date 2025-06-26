# Lexxo - Role-Based Access Control Blog Platform

A secure full-stack blog platform built with Node.js, Express.js, React, and MongoDB. This application implements comprehensive Role-Based Access Control (RBAC) with JWT authentication, email verification, and role-specific functionalities.

## 🚀 Features

### Authentication & Security
- **JWT-based Authentication** with secure token management
- **Email Verification** system with OTP
- **Password Reset** functionality
- **Role-Based Authorization** (Admin/User)
- **Secure Password Hashing**

### User Features
- User registration and login
- Email verification with OTP
- Password reset via email
- View all published blog posts
- View profile
- Update Password

### Admin Features
- **Admin Dashboard** with blog statistics
- **Full Blog Management** (Create, Read, Update, Delete)
- **User Management** capabilities
- **Blog Analytics** and insights

### Technical Features
- **Responsive Design** with modern UI
- **Protected Routes** based on user and admin roles
- **Error Handling** and validation
- **RESTful API** design

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Mongoose** - MongoDB ODM

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling

## 📁 Project Structure

```
lexxo/
├── backend/
│   ├── controllers/
│   │   ├── auth/
│   │   └── blog/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── lib/
│   │   └── ui/
│   ├── .env
│   └── vite.config.js
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/ujjwal0011/lia-plus-assignment.git
cd lia-plus-assignment
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Environment Configuration
Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URL=mongodb://localhost:27017/lexxo

# Frontend URL
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Email Configuration (Gmail SMTP)
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

#### Start the backend server
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to frontend directory (in a new terminal)
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Environment Configuration
Create a `.env` file in the frontend directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

#### Start the frontend development server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication Routes (`/api/v1/auth`)
- `POST /register` - User registration
- `POST /verify-email` - Email verification with OTP
- `POST /login` - User login
- `GET /logout` - User logout
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token
- `POST /resend-verification` - Resend verification OTP
- `GET /profile` - Get current user profile (Protected)
- `PUT /update-password` - Update user password (Protected)

### Blog Routes (`/api/v1/blog`)
- `GET /` - Get all published blogs
- `GET /:id` - Get single blog by ID (Protected)
- `POST /` - Create new blog (Admin only)
- `PUT /:id` - Update blog (Admin only)
- `DELETE /:id` - Delete blog (Admin only)
- `GET /admin/blogs` - Get all blogs for admin (Admin only)
- `GET /admin/stats` - Get blog statistics (Admin only)

## 👥 User Roles

### User Role
- View published blog posts
- View profile
- Update Password

### Admin Role
- All user permissions
- Create, update, and delete blog posts
- Access admin dashboard
- View blog statistics
- Manage blogs

## 🔐 Security Features

- **JWT Authentication** with HTTP-only cookies
- **Password Hashing** using bcryptjs
- **Email Verification** mandatory for account activation
- **Role-based Authorization** middleware
- **Input Validation** and sanitization
- **CORS Configuration** for cross-origin requests
- **Error Handling** without exposing sensitive information

## 📧 Email Configuration

For email functionality, you need to configure SMTP settings. For Gmail:

1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `SMTP_PASSWORD`

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas for cloud database
2. Configure environment variables on your hosting platform
3. Deploy to platforms like Render, Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Update `VITE_BACKEND_URL` to your deployed backend URL

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📝 Usage

1. **Registration**: Create a new account with email verification
2. **Login**: Access your account with email and password
3. **Admin Access**: Contact admin to upgrade your role
4. **Blog Management**: Admins can create, edit, and delete blogs
5. **User Experience**: Regular users can view and interact with content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`

2. **Email Not Sending**
   - Verify SMTP credentials
   - Check if less secure apps are enabled (for Gmail)

3. **CORS Issues**
   - Ensure `FRONTEND_URL` is correctly set in backend `.env`

4. **JWT Token Issues**
   - Clear browser cookies and localStorage
   - Check JWT secret key configuration


**Built with ❤️ by Ujjwal**