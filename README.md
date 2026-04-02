# Lunelle Jewelry

Production-ready full-stack e-commerce starter for a premium necklace brand.

## Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- Frontend: React, Vite, Tailwind CSS
- State: Context API

## Features

- Homepage with hero, featured products, promo banner, testimonials, and newsletter
- Shop page with search, category, material, color, price filters, and sorting
- Product details with gallery, materials, color and length selection, reviews, wishlist, and related products
- Auth flows with register, login, protected routes, hashed passwords, and JWT auth
- Cart, checkout, wishlist, profile, order history, and admin dashboard
- Admin product CRUD, order status updates, user list, and review moderation
- Seed script for categories and necklace products

## Local Setup

1. Copy `.env.example` to `.env`
2. Copy `client/.env.example` to `client/.env`
3. Install dependencies:

```bash
npm install
```

4. Start MongoDB locally
5. Seed the database:

```bash
npm run seed
```

6. Start the API and frontend:

```bash
npm run dev
```

## Default URLs

- Frontend: `http://localhost:5173`
- API: `http://localhost:5001/api`

## Seed Admin

- Email: value from `ADMIN_EMAIL`
- Password: value from `ADMIN_PASSWORD`

## Deploy On Render

This repo includes a `render.yaml` blueprint for deploying:

- `lunelle-api` as a Render Web Service
- `lunelle-client` as a Render Static Site

### Before deploy

1. Push this project to GitHub, GitLab, or Bitbucket.
2. Create a MongoDB database.
   - Easiest option: MongoDB Atlas
3. Keep these production values ready:
   - `MONGO_URI`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

### Deploy steps

1. In Render, select `New` -> `Blueprint`.
2. Connect the repository.
3. Render will read `render.yaml` and create both services.
4. When prompted, set:
   - `CLIENT_URL` to your frontend URL, for example `https://lunelle-client.onrender.com`
   - `VITE_API_URL` to your backend API URL, for example `https://lunelle-api.onrender.com/api`
   - `MONGO_URI` to your MongoDB connection string
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD`
5. Deploy both services.

### Frontend routing

The included `render.yaml` already adds a `/* -> /index.html` rewrite for the static site, so React Router routes like `/shop` and `/profile` keep working after refresh.
