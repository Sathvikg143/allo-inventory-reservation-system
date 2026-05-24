# Inventory Reservation System

## Setup

npm install
npm run dev

## API

GET /api/products

POST /api/reservations
{
 "productId":"<id>",
 "quantity":5
}

POST /api/reservations/:id/confirm

POST /api/reservations/:id/release

## Business Rules

- Reserve only available stock
- Expired reservations cannot confirm
- Released reservations restore stock
- Confirmed reservations finalize reservation
- Uses Prisma transactions