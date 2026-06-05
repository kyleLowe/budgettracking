# Backend

## Project Structure

```
backend/
├── backend.md
├── package.json
├── tsconfig.json
├── @types/
│   └── session.d.ts
└── src/
    ├── cluster.ts
    ├── index.ts
    ├── constants/
    │   └── http-status-codes.ts
    ├── controllers/
    │   ├── AuthController.ts
    │   ├── SubscriptionController.ts
    │   ├── TransactionController.ts
    │   └── UserController.ts
    ├── daos/
    │   ├── SubscriptionDAO.ts
    │   ├── TransactionDAO.ts
    │   └── UserDAO.ts
    ├── errors/
    │   ├── ConflictError.ts
    │   ├── CustomError.ts
    │   ├── ForbiddenError.ts
    │   ├── InternalServerError.ts
    │   ├── NotFoundError.ts
    │   ├── ReqValidationError.ts
    │   ├── RoleError.ts
    │   └── UnauthorisedError.ts
    ├── middleware/
    │   └── auth.ts
    ├── models/
    │   ├── Category.ts
    │   ├── Currency.ts
    │   ├── Subscription.ts
    │   ├── Transaction.ts
    │   └── User.ts
    ├── routes/
    │   ├── AuthRoutes.ts
    │   ├── SubscriptionRoutes.ts
    │   ├── TransactionRoutes.ts
    │   └── UserRoutes.ts
    └── services/
        ├── AuthServices.ts
        ├── SubscriptionServices.ts
        ├── TransactionServices.ts
        └── UserServices.ts
```

## Overview

- **src/** - Main source code directory
  - **constants/** - Application constants (HTTP status codes, etc.)
  - **controllers/** - Request handlers for routes which validates variables before going to services
  - **daos/** - Data Access Objects for database operations
  - **errors/** - Custom error classes
  - **middleware/** - Express middleware to check authentication
  - **models/** - Data models and schemas to access and view objects from database
  - **routes/** - Route definitions for different endpoints
  - **services/** - Business logic layer to check for validation such as permissions and relationships then goes to daos
  - **index.ts** - Setting up express backend
  - **cluster.ts** - Connects to MongoDB Cluster
- **@types/** - TypeScript type definitions
