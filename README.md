
# Next.js API


## Project Description
This project implements the following features :
1. **User API**:
   - `GET /api/users`: Fetch all users.
   - `POST /api/users`: Add a new user (name, email, password).
   - `GET /api/users/:id`: Fetch a single user by ID.
   - `POST /api/login`: Login user (email,password)
   - `POST /api/logout`: Logout user
   - **Authentication**: Secured using JWT.

2. **Webhook Endpoint**:
   - `POST /api/webhook`: Processes incoming requests, validates the signature, and stores data in `db.json`.

---

## Tech Stack
- **Framework**: Next Js
- **Database**: MongoDB (NoSQL database)
- **Authentication**: JSON Web Token (JWT) for secure API access
### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kazisadman/everythinggreen
   ```

2. Navigate to the project directory:
   ```bash
   cd everythinggreen
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI = your-mongodb-uri-with-username-and-password
   ACCESS_TOKEN_SECRET = your-jwt-secret
   WEBHOOK_SECRET_KEY = your-secret-key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. The API will be available at `http://localhost:3000`.
# API Documentation

## User API

**Fetch All Users:**
```bash
GET /api/users
```
**Add New User:**
```bash
POST /api/users
```
```bash
Body: { "name": "John", "email": "john@example.com", "password": "password123" }
```
**Fetch Single User:**
```bash
GET /api/users/:id
```

## Webhook Endpoint

**Process Webhook:**
```bash
POST /api/webhook
```
```bash
Headers: { "x-signature": "<computed-signature>" },{"Content-Type":"application/json"}
```
```bash
Body: { "eventType": "test", "data": { "key": "value" } }
```
## Note:
* The application uses a **db.json** file to store data. This file is automatically created when the application runs.
