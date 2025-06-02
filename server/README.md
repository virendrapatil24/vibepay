# VibePay Backend

The backend server for VibePay built with Node.js, Express, and TypeScript.

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Zod for request validation
- bcrypt for password hashing

## 📁 Project Structure

```
src/
├── auth/           # Authentication middleware and utilities
├── controllers/    # Route controllers
├── models/         # Mongoose models
├── routes/         # API routes
├── utils/          # Utility functions
├── validators/     # Request validation schemas
└── index.ts        # Application entry point
```

## 🚀 Getting Started

1. Install dependencies

```bash
npm install
```

2. Set up environment variables
   Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

5. Start production server

```bash
npm start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript files
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Dependencies

### Production

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `zod` - Schema validation

### Development

- TypeScript
- `nodemon` - Development server
- `ts-node-dev` - TypeScript execution
- `@types/*` - TypeScript type definitions

## 🔒 API Endpoints

### User Routes

- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile

### Account Routes

- `GET /api/v1/account` - Get account details
- `POST /api/v1/account` - Create new account
- `PUT /api/v1/account` - Update account details

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled
- Request validation with Zod
- Error handling middleware

## 📝 License

This project is licensed under the MIT License.
