# Personal Portfolio with Authentication

A modern, interactive personal portfolio website built with Next.js, TypeScript, and MongoDB, featuring user authentication and a beautiful UI.

## Features

- 🔐 Secure Authentication System
  - User registration and login
  - JWT-based authentication
  - Protected routes
  - Secure password hashing
  - MongoDB integration

- 🎨 Modern UI/UX
  - Responsive design
  - Interactive components
  - Beautiful animations
  - Tailwind CSS styling

- 📱 Portfolio Sections
  - Home
  - Developer Profile
  - Projects Showcase
  - Experience Timeline
  - Education History
  - Contact Form
  - Q&A Section

## Tech Stack

- **Frontend:**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - React Hooks
  - Client-side routing

- **Backend:**
  - Next.js API Routes
  - MongoDB
  - Mongoose
  - JWT Authentication
  - bcryptjs

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn






## Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── login/
│   │   │       └── register/
│   │   ├── login/
│   │   ├── register/
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   │   ├── auth.ts
│   │   └── mongodb.ts
│   └── models/
│       └── User.ts
├── public/
├── .env.local
└── package.json
```

## Authentication Flow

1. **Registration**
   - User fills out registration form
   - Password is hashed using bcrypt
   - User data is stored in MongoDB
   - Redirect to login page

2. **Login**
   - User enters credentials
   - Server validates credentials
   - JWT token is generated
   - Token stored in cookies and localStorage
   - Redirect to home page

3. **Protected Routes**
   - Middleware checks for valid token
   - Unauthorized users redirected to login
   - Authenticated users can access protected content

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/my-portfolio](https://github.com/yourusername/my-portfolio)
