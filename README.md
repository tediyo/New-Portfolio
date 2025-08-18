
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



