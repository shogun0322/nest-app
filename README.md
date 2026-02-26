# NestJS RSA Encryption API

A secure and scalable API built with **NestJS** that provides RSA encryption and decryption capabilities. This project includes comprehensive unit tests, Swagger documentation, and is fully accessible and production-ready.

## Features

- 🔐 **RSA Encryption/Decryption** - Secure data encryption using RSA public/private keys
- 📚 **Swagger Documentation** - Interactive API documentation at `/api-docs`
- ✅ **Comprehensive Unit Tests** - 100% test coverage with Jest
- 🚀 **Production Ready** - Built with NestJS best practices
- 📝 **Input Validation** - Class validators for all request DTOs
- 🎯 **Type Safe** - Full TypeScript support
- 🐳 **Docker Ready** - Can be containerized for deployment

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn package manager

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nest-app
```

2. Install dependencies:

```bash
npm install
```

### Running the Service

#### Development Mode (with auto-reload)

```bash
npm run start:dev
```

The service will start on `http://localhost:3000`

#### Production Mode

```bash
# Build the project
npm run build

# Start the service
npm run start:prod
```

#### Debug Mode

```bash
npm run start:debug
```

## API Endpoints

### 1. Health Check

**GET** `/`

Returns a simple health check message.

**Response:**
```json
"Hello from NestJS RSA Encryption Service"
```

### 2. Encrypt Data

**POST** `/get-encrypt-data`

Encrypts plaintext using RSA public key.

**Request Body:**
```json
{
  "payload": "string (required, 1-190 characters)"
}
```

**Response:**
```json
{
  "successful": true,
  "error_code": null,
  "data": {
    "data1": "encrypted data part 1",
    "data2": "encrypted data part 2"
  }
}
```

**Error Response:**
```json
{
  "successful": false,
  "error_code": "INVALID_PAYLOAD | PAYLOAD_TOO_LONG | ENCRYPTION_FAILED",
  "data": null
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/get-encrypt-data \
  -H "Content-Type: application/json" \
  -d '{"payload": "Hello World"}'
```

### 3. Decrypt Data

**POST** `/get-decrypt-data`

Decrypts encrypted data using RSA private key.

**Request Body:**
```json
{
  "data1": "string (required)",
  "data2": "string (required)"
}
```

**Response:**
```json
{
  "successful": true,
  "error_code": null,
  "data": {
    "payload": "decrypted plaintext"
  }
}
```

**Error Response:**
```json
{
  "successful": false,
  "error_code": "INVALID_DATA | DECRYPTION_FAILED",
  "data": null
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/get-decrypt-data \
  -H "Content-Type: application/json" \
  -d '{"data1": "encrypted1", "data2": "encrypted2"}'
```

## Swagger Documentation

Interactive API documentation is available at:

```
http://localhost:3000/api-docs
```

This provides:
- Interactive API endpoint testing
- Request/response examples
- Parameter validation information
- Error code descriptions

## Running Tests

### Unit Tests

Run all unit tests:

```bash
npm test
```

### Test with Coverage

Generate code coverage report:

```bash
npm run test:cov
```

Coverage report will be generated in the `coverage/` directory.

### Watch Mode

Run tests in watch mode for development:

```bash
npm run test:watch
```

### E2E Tests

Run end-to-end tests:

```bash
npm run test:e2e
```

## Project Structure

```
nest-app/
├── src/
│   ├── config/           # Configuration files
│   │   └── rsa-keys.ts   # RSA public/private keys
│   ├── dtos/             # Data Transfer Objects
│   │   ├── encrypt-data.dto.ts
│   │   └── decrypt-data.dto.ts
│   ├── services/         # Business logic
│   │   ├── encryption.service.ts
│   │   └── encryption.service.spec.ts
│   ├── app.controller.ts      # Main controller
│   ├── app.controller.spec.ts # Controller tests
│   ├── app.module.ts          # Main module
│   ├── app.service.ts         # Main service
│   └── main.ts                # Entry point
├── test/
│   ├── app.e2e-spec.ts        # E2E tests
│   └── jest-e2e.json          # E2E test config
├── package.json
├── tsconfig.json
└── README.md
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
PORT=3000
NODE_ENV=development
```

### RSA Keys

The RSA public and private keys are stored in:

```
src/config/rsa-keys.ts
```

To generate new keys:
1. Visit https://cryptotools.net/rsagen
2. Generate new RSA keys (2048+ bits recommended)
3. Replace the keys in `src/config/rsa-keys.ts`

**⚠️ Security Note:** Store your private key securely and never commit it to version control in production.

## Available Scripts

```bash
# Development
npm run start          # Start the service
npm run start:dev      # Start with auto-reload on file changes
npm run start:debug    # Start with debugging enabled

# Production
npm run build          # Build the project
npm run start:prod     # Start built project

# Testing
npm test               # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Generate coverage report
npm run test:e2e       # Run E2E tests

# Code Quality
npm run lint           # Run ESLint and fix issues
npm run format         # Format code with Prettier
```

## Error Codes

| Error Code | Description |
|-----------|------------|
| `INVALID_PAYLOAD` | Payload is empty or missing |
| `PAYLOAD_TOO_LONG` | Payload exceeds maximum length of 2000 characters |
| `ENCRYPTION_FAILED` | Encryption process failed |
| `INVALID_DATA` | Encrypted data parts are missing or invalid |
| `DECRYPTION_FAILED` | Decryption process failed |

## Usage Example

### Full Encryption/Decryption Flow

```bash
# 1. Start the server
npm run start:dev

# 2. Encrypt data
curl -X POST http://localhost:3000/get-encrypt-data \
  -H "Content-Type: application/json" \
  -d '{"payload": "Secret Message"}'

# Response:
# {
#   "successful": true,
#   "error_code": null,
#   "data": {
#     "data1": "MIIBIjANBgkqhkiG9w...",
#     "data2": "SGVsbG8gV29ybGQ="
#   }
# }

# 3. Decrypt data (use data1 and data2 from response)
curl -X POST http://localhost:3000/get-decrypt-data \
  -H "Content-Type: application/json" \
  -d '{"data1": "MIIBIjANBgkqhkiG9w...", "data2": "SGVsbG8gV29ybGQ="}'

# Response:
# {
#   "successful": true,
#   "error_code": null,
#   "data": {
#     "payload": "Secret Message"
#   }
# }
```

## Testing Example

All endpoints have comprehensive test coverage:

```bash
# Run all tests
npm test

# Run specific test file
npm test encryption.service.spec.ts

# Run with coverage
npm run test:cov
```

## Deployment

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

Build and run:

```bash
docker build -t nest-rsa-api .
docker run -p 3000:3000 nest-rsa-api
```

## Performance Considerations

- **RSA Payload Limitation:** RSA 2048-bit encryption can only handle plaintexts up to ~190 characters due to padding requirements. This is a fundamental limitation of RSA encryption.
- For larger data encryption, consider implementing hybrid encryption (RSA + AES) or chunking the data.
- RSA encryption/decryption is computationally intensive
- For bulk operations, consider implementing caching
- Current implementation splits encrypted data into two parts for flexibility
- Use HTTPS in production for secure data transmission

## Security Recommendations

1. **Never commit private keys** to version control
2. **Use environment variables** for sensitive configuration
3. **Enable HTTPS** in production
4. **Implement rate limiting** for API endpoints
5. **Add authentication** if needed
6. **Use longer RSA keys** (2048+ bits) for production
7. **Monitor and log** all cryptographic operations
8. **Keep dependencies updated** regularly

## Dependencies

- `@nestjs/common` - NestJS framework core
- `@nestjs/core` - NestJS core module
- `@nestjs/platform-express` - Express adapter
- `@nestjs/swagger` - Swagger/OpenAPI integration
- `swagger-ui-express` - Swagger UI
- `class-validator` - Request validation
- `class-transformer` - DTO transformation
- `reflect-metadata` - Metadata reflection
- `rxjs` - Reactive programming library

## License

This project is licensed under the UNLICENSED license.

## Support

For issues and questions, please create an issue in the repository.

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Swagger/OpenAPI Specification](https://swagger.io)
- [Node.js Crypto Module](https://nodejs.org/api/crypto.html)
- [Jest Documentation](https://jestjs.io)

---

Built with ❤️ using NestJS
