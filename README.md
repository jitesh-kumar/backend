# Calculator Backend API

A RESTful Node.js/Express API for performing arithmetic calculations and persisting results to MongoDB. Built with modern ES modules, comprehensive error handling, and full CRUD operations.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- ✅ RESTful API design with Express.js
- ✅ MongoDB integration with Mongoose ODM
- ✅ Add two numbers and save calculations
- ✅ Retrieve calculation history
- ✅ Delete individual calculations
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation and error handling
- ✅ Automatic timestamps (createdAt, updatedAt)
- ✅ Environment-based configuration
- ✅ ES Modules support

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM
- **Additional Libraries**:
  - `cors` - Cross-Origin Resource Sharing
  - `dotenv` - Environment variable management
  - `nodemon` - Development auto-reload

## 📦 Prerequisites

Before running this project, ensure you have:

- Node.js 18 or higher installed
- MongoDB installed locally or access to MongoDB Atlas
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository** (if not already done):
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Configuration](#configuration))

5. **Start MongoDB** (if using local):
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl start mongod
   ```

6. **Start the server**:
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

Server runs on: `http://localhost:5000`

## ⚙️ Configuration

Create a `.env` file in the backend root directory:

```bash
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/calculations

# For MongoDB Atlas (Cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/calculations?retryWrites=true&w=majority
```

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `5000` | No |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/calculations` | Yes |

## 📡 API Documentation

### Health Check

**GET /**

Returns API status and available endpoints.

**Response (200 OK):**
```json
{
  "message": "API is working!",
  "endpoints": {
    "health": "GET /",
    "addCalculation": "POST /api/calculations/add",
    "getCalculations": "GET /api/calculations",
    "getCalculation": "GET /api/calculations/:id",
    "deleteCalculation": "DELETE /api/calculations/:id"
  }
}
```

---

### Add Two Numbers

**POST /api/calculations/add**

Adds two numbers and saves the result to the database.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "number1": 10,
  "number2": 20
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Calculation saved successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "number1": 10,
    "number2": 20,
    "sum": 30,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Both number1 and number2 are required"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/calculations/add \
  -H "Content-Type: application/json" \
  -d '{"number1": 15, "number2": 27}'
```

---

### Get All Calculations

**GET /api/calculations**

Retrieves all calculations, sorted by creation date (newest first).

**Query Parameters:**
- `limit` (optional): Number of results to return (default: 10)

**Request:**
```bash
GET /api/calculations?limit=5
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "number1": 10,
      "number2": 20,
      "sum": 30,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**cURL Example:**
```bash
curl http://localhost:5000/api/calculations?limit=10
```

---

### Get Specific Calculation

**GET /api/calculations/:id**

Retrieves a single calculation by ID.

**Request:**
```bash
GET /api/calculations/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "number1": 10,
    "number2": 20,
    "sum": 30,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Calculation not found"
}
```

---

### Delete Calculation

**DELETE /api/calculations/:id**

Deletes a specific calculation.

**Request:**
```bash
DELETE /api/calculations/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Calculation deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "number1": 10,
    "number2": 20,
    "sum": 30
  }
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/calculations/507f1f77bcf86cd799439011
```

## 📁 Project Structure

```
backend/
├── models/
│   └── Calculation.js          # MongoDB schema definition
├── routes/
│   └── calculationRoutes.js    # API route handlers
├── server.js                    # Express app setup & MongoDB connection
├── package.json                 # Dependencies and scripts
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

## 🗄️ Database Schema

### Calculation Model

```javascript
{
  number1: {
    type: Number,
    required: true
  },
  number2: {
    type: Number,
    required: true
  },
  sum: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- Primary: `_id` (auto-generated)
- Sort: `createdAt` (descending)

## 💻 Development

### Available Scripts

```bash
# Start server with auto-reload
npm run dev

# Start server in production mode
npm start

# Run tests (when implemented)
npm test
```

### Development Workflow

1. Make changes to source files
2. Server automatically restarts (nodemon)
3. Test endpoints using cURL or Postman
4. Check MongoDB data using MongoDB Compass or CLI

### Adding New Endpoints

1. Define route handler in `routes/calculationRoutes.js`
2. Register route in `server.js`
3. Test the new endpoint
4. Update API documentation

## 🧪 Testing

### Manual Testing with cURL

**Test health endpoint:**
```bash
curl http://localhost:5000/
```

**Add calculation:**
```bash
curl -X POST http://localhost:5000/api/calculations/add \
  -H "Content-Type: application/json" \
  -d '{"number1": 42, "number2": 58}'
```

**Get all calculations:**
```bash
curl http://localhost:5000/api/calculations
```

### Using Postman

1. Import the following collection:
   - Base URL: `http://localhost:5000`
   - Endpoints: See [API Documentation](#api-documentation)

2. Test each endpoint with various inputs

### Testing with MongoDB Compass

1. Connect to: `mongodb://localhost:27017`
2. Navigate to `calculations` database
3. View `calculations` collection
4. Verify data integrity

## 🚢 Deployment

### Environment Setup

1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible from your server
3. Configure CORS for your frontend domain

### Deployment Platforms

**Recommended platforms:**
- Heroku
- Railway
- Render
- AWS Elastic Beanstalk
- DigitalOcean App Platform

**Example: Deploying to Heroku**

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI="your-mongodb-uri"

# Deploy
git push heroku main

# Open app
heroku open
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas for database
- [ ] Enable CORS for specific origins
- [ ] Set up proper error logging
- [ ] Add rate limiting
- [ ] Enable HTTPS
- [ ] Set up monitoring (e.g., PM2, New Relic)
- [ ] Configure backup strategy

## 🐛 Troubleshooting

### MongoDB Connection Error

**Problem:** `MongoDB connection error: connect ECONNREFUSED`

**Solutions:**
1. Ensure MongoDB is running:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mongod
   ```

2. Verify connection string in `.env`
3. For Atlas, whitelist your IP address

---

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
kill -9 $(lsof -ti:5000)

# Or change PORT in .env
```

---

### CORS Error

**Problem:** Frontend can't access API due to CORS

**Solution:**
Update `server.js` to allow your frontend origin:
```javascript
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

---

### Validation Errors

**Problem:** `Invalid numbers provided`

**Solution:** Ensure request body contains valid numeric values:
```json
{
  "number1": 10,  // Must be a number
  "number2": 20   // Must be a number
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

ISC

## 🔗 Related Documentation

- [Frontend README](../frontend/README.md)
- [Complete Setup Guide](../SETUP_GUIDE.md)
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 📞 Support

For issues and questions:
- Check [Troubleshooting](#troubleshooting) section
- Review [SETUP_GUIDE.md](../SETUP_GUIDE.md)
- Open an issue on GitHub
