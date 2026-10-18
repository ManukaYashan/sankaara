# SANKĀRA — Architecture & Backend Developer Guide

This document outlines the frontend technology stack, client-side form payloads, and recommended backend API routes to assist in building the backend service for **S A N K Ā R A**.

---

## 1. Frontend Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | Strict type checking, modern hooks |
| **Bundler / Build** | Vite 8 | Ultra-fast HMR, production chunk splitting |
| **Routing** | React Router DOM v7 | `HashRouter` (SPA deep-linking on static hosts) |
| **Styling** | Tailwind CSS v3 + CSS Variables | Bespoke luxury tokens defined in `src/index.css` |
| **Typography** | Google Fonts | `Montserrat` (Headings), `Cormorant Garamond` (Serif/Quotes), `Plus Jakarta Sans` (Body) |
| **Icons** | Lucide React + Material Symbols | Vector icons for UI & amenities |
| **Deploy Target** | GitHub Pages / Vercel / Cloudflare | Static client build in `dist/` |

---

## 2. Forms & Client-Side Data Payloads

### A. Room Booking Modal (`src/pages/Rooms.tsx`)
Triggered when a guest clicks **"Book Suite"** on any of the 5 private pavilions.

#### Form State Object:
```typescript
interface BookingFormData {
  suiteId: string;       // e.g. "suite-01" | "suite-02" | "suite-03" | "suite-04" | "suite-05"
  suiteName: string;     // e.g. "Forest View Suite", "The Master Sanctuary"
  name: string;          // Guest Full Name (Required)
  email: string;         // Guest Email Address (Required)
  phone: string;         // International Phone / WhatsApp (Required)
  checkIn: string;       // Check-In Date (e.g. "14 OCT 2024" or "YYYY-MM-DD")
  checkOut: string;      // Check-Out Date (e.g. "18 OCT 2024" or "YYYY-MM-DD")
  notes?: string;        // Dietary requests, transit coordination, special notes
}
```

---

### B. Hero Quick-Check Strip (`src/pages/Home.tsx`)
Quick inquiry bar located in the hero section:
- `checkIn`: Check-In Date (`string`)
- `checkOut`: Check-Out Date (`string`)
- `guests`: Guest selection (`"02 Guests (1 Suite)"` | `"01 Guest (Solo Retreat)"` | `"Whole Sanctuary Buyout"`)

*Currently redirects with client state to `/rooms`.*

---

## 3. Recommended Backend API Routes

Base URL: `/api/v1`

### 1. Create Reservation Inquiry
- **Endpoint:** `POST /api/v1/bookings`
- **Description:** Receives a guest booking request, creates a record in the database with status `PENDING_REVIEW`, and triggers an email/WhatsApp dispatch to the Master Butler.
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "suiteId": "suite-05",
  "name": "Julian Aris",
  "email": "julian.aris@residence.com",
  "phone": "+61 400 123 456",
  "checkIn": "2024-11-10",
  "checkOut": "2024-11-15",
  "guests": 2,
  "notes": "Vegetarian Ayurvedic dining requested. Arrival via Colombo helicopter transfer."
}
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "bookingId": "SK-2024-0891",
  "status": "PENDING_CONFIRMATION",
  "message": "Your inquiry has been dispatched to the Master Butler. We will contact you within 4 hours."
}
```

---

### 2. Check Suite Availability
- **Endpoint:** `GET /api/v1/availability`
- **Query Params:** `?checkIn=2024-11-10&checkOut=2024-11-15`
- **Response `200 OK`:**
```json
{
  "checkIn": "2024-11-10",
  "checkOut": "2024-11-15",
  "availableSuites": [
    { "id": "suite-01", "name": "Forest View Suite", "available": true, "ratePerNight": 650 },
    { "id": "suite-02", "name": "Courtyard Garden Room", "available": false },
    { "id": "suite-03", "name": "Veranda Deluxe", "available": true, "ratePerNight": 740 },
    { "id": "suite-04", "name": "Rooftop Terrace Suite", "available": true, "ratePerNight": 880 },
    { "id": "suite-05", "name": "The Master Sanctuary", "available": true, "ratePerNight": 1150 }
  ]
}
```

---

### 3. General Concierge Contact Inquiry
- **Endpoint:** `POST /api/v1/contact`
- **Description:** For inquiries from policies, transit coordination, or bespoke retreat questions.
- **Request Body:**
```json
{
  "name": "Elena Rostova",
  "email": "elena@geneva.ch",
  "subject": "Private Helipad Reception",
  "message": "Inquiring about coordinates for private arrival at the ridge helipad."
}
```

---

## 4. Database Schema Proposal (PostgreSQL / Prisma)

```prisma
model Booking {
  id          String        @id @default(cuid())
  bookingRef  String        @unique // e.g. "SK-2024-001"
  suiteId     String        // "suite-01" to "suite-05"
  guestName   String
  email       String
  phone       String
  checkIn     DateTime
  checkOut    DateTime
  guestsCount Int           @default(2)
  notes       String?       @db.Text
  status      BookingStatus @default(PENDING)
  totalPrice  Decimal?      @db.Decimal(10, 2)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}
```

---

## 5. Notification & Email Architecture

When a booking inquiry is submitted:
1. **Guest Confirmation Email:** Elegant branded email sent to `guest.email` confirming receipt of their reservation inquiry.
2. **Concierge / Butler Alert:** Immediate dispatch via:
   - **Resend** or **SendGrid** to `concierge@sankara-retreat.com`
   - *(Optional)* **Twilio WhatsApp API** notification directly to the duty butler's phone.

---

## 6. Frontend Environment Configuration

When switching the frontend from mock mode to live backend:
Create `.env` file in the project root:
```env
VITE_API_BASE_URL=https://api.sankara-retreat.com/api/v1
```
And replace the mock handler in `src/pages/Rooms.tsx` with a standard `fetch` call:
```typescript
const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookings`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```
