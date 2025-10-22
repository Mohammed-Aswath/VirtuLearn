/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Backend developer guide
 * BACKEND CONTRACT: Implements all endpoints used by VirtuLearn frontend
 * TODO: Fill in production deployment notes and secrets management
 */

# VirtuLearn Backend (Node.js + Express + MongoDB)

This backend powers the VirtuLearn frontend. It provides JWT auth, quizzes, experiments, community posts, S3 presigned uploads, and Gemini proxy endpoints.

## Stack
- Node.js, Express, Mongoose
- JWT (HS256), bcrypt
- AWS SDK v3 (S3 presign)
- Rate limiting, validation, logging

## Run locally
1. Copy `.env.example` to `.env` and set values (at minimum `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`).
2. Install deps: `npm i`
3. Seed DB (optional): `npm run seed`
4. Start dev: `npm run start:dev`

## Scripts
- `npm run start` — start server
- `npm run start:dev` — nodemon dev start
- `npm run seed` — seed sample data
- `npm test` — run tests
- `npm run lint` — lint

## API Contracts
Endpoints implemented under `/api`:
- Auth: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- Users: `GET /users/:id`, `GET /users?role=student`
- Experiments: `GET /experiments?subject=...`, `GET /experiments/:id`, `POST /experiments`, `POST /experiments/assign`, `GET /experiments/logs`, `POST /experiments/logs`, `POST /experiments/log` (Arcware HMAC)
- Quizzes: `GET /quizzes?subject=...`, `GET /quizzes/:quizId`, `POST /quizzes`, `POST /quizzes/:quizId/attempt`, `GET /quizzes/:quizId/analysis`, `GET /quizzes/:quizId/attempts`
- Community: `GET /community?subject=...`, `POST /community`, `DELETE /community/:id`
- AI: `POST /ai/chat`, `POST /ai/generate-quiz`, `GET /ai/usage`
- S3: `GET /s3/presign-upload`, `GET /s3/presign-download`, `POST /s3/metadata`

## S3 & Gemini
- S3 uses presigned URLs. Store metadata via `POST /api/s3/metadata` after upload.
- Gemini endpoints are mocked if `GEMINI_API_KEY` is not set. Real calls are outlined in comments in `src/services/gemini.service.js`.

## Docker
See `Dockerfile` and `docker-compose.yml` for local Mongo + backend. Update envs as needed.

## Postman
Import `backend/postman/virtulearn.postman_collection.json` for examples.


